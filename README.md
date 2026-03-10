# WWTP Monitoring & AI Insights

A comprehensive Wastewater Treatment Plant (WWTP) monitoring system featuring a FastAPI backend with AI-driven anomaly detection, a React-based web dashboard, and a React Native mobile application.

## 🚀 Project Structure

- **/backend**: FastAPI server, SQLAlchemy (SQLite), and AI logic.
- **/frontend**: React web application with real-time dashboards and trends.
- **/mobile**: Expo-powered React Native app for on-the-go monitoring.
- **render.yaml**: Infrastructure-as-Code for one-click deployment to Render.

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy (Async), Scikit-learn (Anomaly Detection).
- **Frontend**: React, TailwindCSS, Recharts, Framer Motion.
- **Mobile**: React Native, Expo, Lucide Icons, React Navigation.

## 🏃 Local Development

### 1. Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Mobile
```bash
cd mobile
npm install
npx expo start
```

## 🌐 Deployment

### Render (Cloud)
The project is configured for [Render](https://render.com).
- **Backend**: Deployed as a Web Service.
- **Frontend**: Deployed as a Web Service or Static Site.
- **Root Directory**: Set appropriately for each service (`backend` or `frontend`).

### Android APK
To build a mobile APK:
1. Install EAS CLI: `npm install -g eas-cli`
2. Run: `eas build -p android --profile preview`

## 📊 Features
- **Real-time Metrics**: Monitor COD, DO, MLSS, and Turbidity.
- **AI Anomaly Detection**: Automatic flagging of irregular plant behavior.
- **Actionable Insights**: AI-generated recommendations based on sensor data.
- **Cross-Platform**: Seamless experience across Desktop, Android, and iOS.

---
Developed with ❤️ for smarter water management.
