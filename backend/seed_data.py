import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from database import SessionLocal
from models import WWTPData

async def generate_data():
    start = datetime.now() - timedelta(days=180)
    dates = [start + timedelta(days=i) for i in range(180)]

    records = []

    for i, date in enumerate(dates):
        seasonal = 50 * np.sin(2 * np.pi * i / 180)

        cod = 350 + seasonal + np.random.normal(0, 30)
        bod = cod * 0.6 + np.random.normal(0, 10)
        mlss = 3200 + np.random.normal(0, 200)
        mlvss = mlss * 0.7
        do = 2.5 + np.random.normal(0, 0.3)
        ph = 7.2 + np.random.normal(0, 0.2)
        svi = 120 + np.random.normal(0, 15)
        turbidity = 5 + np.random.normal(0, 2)
        sludge_age = 10 + np.random.normal(0, 2)
        hrt = 8 + np.random.normal(0, 1)
        flow = 10000 + seasonal * 20 + np.random.normal(0, 500)

        records.append(
            WWTPData(
                date=date,
                cod=cod,
                bod=bod,
                mlss=mlss,
                mlvss=mlvss,
                do=do,
                ph=ph,
                svi=svi,
                turbidity=turbidity,
                sludge_age=sludge_age,
                hrt=hrt,
                flow=flow
            )
        )

    async with SessionLocal() as db:
        db.add_all(records)
        await db.commit()
