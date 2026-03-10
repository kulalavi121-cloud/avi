def generate_recommendation(data):
    recommendations = []

    if data["do"] < 1.5:
        recommendations.append("Increase aeration blower capacity.")

    if data["svi"] > 160:
        recommendations.append("Check for sludge bulking. Reduce sludge age.")

    if data["ph"] < 6.5:
        recommendations.append("Add alkalinity dosing.")

    if data["turbidity"] > 10:
        recommendations.append("Check secondary clarifier performance.")

    return recommendations