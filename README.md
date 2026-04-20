# 🚀 Real-Time Predictive Maintenance System

A real-time machine monitoring system that detects anomalies using Machine Learning and rule-based thresholds.

---

## 📌 Overview
This project simulates an industrial machine and monitors its behavior in real-time.  
It uses an ML model (**Isolation Forest**) to detect anomalies and combines it with manual threshold controls to trigger alerts.

---

## ⚙️ Features
- 📊 Live data simulation (Temperature, Vibration, Pressure, RPM)
- 🤖 ML-based anomaly detection (Isolation Forest)
- 🎛️ Manual threshold controls (user-defined limits)
- 🚨 Smart alert system (Warning / Critical / ML anomaly)
- 📈 Real-time interactive dashboard (Chart.js)
- 🔴 Visual anomaly highlighting on graphs

---

## 🧠 Tech Stack
- **Backend:** Python, Flask  
- **Machine Learning:** scikit-learn (Isolation Forest)  
- **Frontend:** HTML, CSS, JavaScript  
- **Visualization:** Chart.js  

---

## 🔍 How It Works
1. Synthetic sensor data is generated continuously  
2. Model is trained on **normal data only**  
3. Incoming data is evaluated in real-time  
4. ML detects anomalies based on pattern deviation  
5. Thresholds trigger critical alerts for safety  

---

## ▶️ Run Locally

```bash
pip install -r requirements.txt
python app.py
```

Open in browser:
http://127.0.0.1:5000

## 📊 Dataset
Data is synthetically generated using data_simulator.py
Includes:
Temperature
Vibration
Pressure
RPM
# Sample dataset available in data/dataset_sample.csv


## 🚨 Alert Logic
### ⚠️ Warning → approaching threshold
### 🚨 Critical → exceeds threshold
### 🤖 ML Alert → anomaly detected via model

## 🎯 Key Learning
Difference between rule-based systems vs ML models
Multi-feature anomaly detection
Real-time data visualization
End-to-end ML + Web integration

##📌 Note

This project is a simulation of real-world predictive maintenance systems used in industries to reduce failures and downtime.

## 👨‍💻 Author

Atharva Shinde

# ⭐ If you like this project

