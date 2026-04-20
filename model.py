import pandas as pd
from sklearn.ensemble import IsolationForest


df = pd.read_csv("data/dataset.csv")
features = ["temperature", "vibration", "pressure", "rpm"]
X = df[features]

X_train = df[df["fault"] == False][features]

model = IsolationForest(contamination=0.1, random_state=42)
model.fit(X_train)
df["anomaly"] = model.predict(X)

# Convert output:
# 1 → normal, -1 → anomaly
df["anomaly"] = df["anomaly"].map({1: 0, -1: 1})

# Compare with actual fault
print("\nSample Results:\n")
print(df[["temperature", "vibration", "pressure", "rpm", "fault", "anomaly"]].tail(20))

# Accuracy check (simple)
correct = (df["fault"] == df["anomaly"]).sum()
total = len(df)

print(f"\nModel Accuracy: {correct}/{total} = {round(correct/total*100, 2)}%")

import joblib

joblib.dump(model, "model/isolation_forest.pkl")
print("Model saved!")