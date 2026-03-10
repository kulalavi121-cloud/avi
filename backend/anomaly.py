from sklearn.ensemble import IsolationForest
import pandas as pd
from crud import get_all_data

# Global instance for the model to avoid retraining on every request
_model = None

async def _get_or_train_model(db):
    global _model
    if _model is None:
        data = await get_all_data(db)
        if not data:
            return None
        
        df = pd.DataFrame([{
            "cod": d.cod,
            "bod": d.bod,
            "mlss": d.mlss,
            "do": d.do,
            "ph": d.ph,
            "svi": d.svi,
            "turbidity": d.turbidity,
            "flow": d.flow
        } for d in data])
        
        _model = IsolationForest(contamination=0.05, random_state=42)
        _model.fit(df)
    return _model

async def detect_anomalies(db, limit: int = 10):
    # Fetch recent data to check for anomalies
    from crud import get_data
    paginated = await get_data(db, skip=0, limit=limit)
    data = paginated["items"]
    
    if not data:
        return []

    df = pd.DataFrame([{
        "cod": d.cod,
        "bod": d.bod,
        "mlss": d.mlss,
        "do": d.do,
        "ph": d.ph,
        "svi": d.svi,
        "turbidity": d.turbidity,
        "flow": d.flow
    } for d in data])

    model = await _get_or_train_model(db)
    
    if model is not None:
        df["anomaly_ml"] = model.predict(df)
        # decision_function returns scores where lower is more anomalous
        # We'll normalize it so higher is more anomalous
        scores = model.decision_function(df.drop(columns=["anomaly_ml"], errors="ignore"))
        # scores are typically in range [-0.5, 0.5] approximately. 
        # Let's map it roughly to [0, 1] where 1 is highly anomalous.
        df["anomaly_score"] = [1.0 - (s + 0.5) for s in scores]
    else:
        df["anomaly_ml"] = 1 
        df["anomaly_score"] = 0.0

    rule_flags = (
        (df["do"] < 1.2) |
        (df["ph"] < 6.0) |
        (df["svi"] > 180) |
        (df["turbidity"] > 15)
    )

    df["anomaly_rule"] = rule_flags
    
    # If rule flags it, ensure score is at least high
    df.loc[df["anomaly_rule"], "anomaly_score"] = df["anomaly_score"].clip(lower=0.8)

    # Convert back to list of dicts
    result = df.to_dict(orient="records")
    
    # Add id and date from original objects since pandas might have lost some metadata if not careful
    # But here 'data' are the original models, we can just zip them if needed
    for i, item in enumerate(result):
        item["id"] = data[i].id
        item["date"] = data[i].date.isoformat() if data[i].date else None

    return result
