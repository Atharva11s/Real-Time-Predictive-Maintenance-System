from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
import pandas as pd

# Load data
df = pd.read_csv("data/dataset.csv")

features = ["temperature", "vibration", "pressure", "rpm"]

# Split data
train_df, test_df = train_test_split(df, test_size=0.3, random_state=42)

# Train only on NORMAL data
X_train = train_df[train_df["fault"] == False][features]

# Define model
model = IsolationForest(contamination=0.1, random_state=42)

# 🔥 THIS WAS MISSING
model.fit(X_train)

# Test on unseen data
X_test = test_df[features]

test_df["anomaly"] = model.predict(X_test)
test_df["anomaly"] = test_df["anomaly"].map({1: 0, -1: 1})

# Accuracy
correct = (test_df["fault"] == test_df["anomaly"]).sum()
total = len(test_df)

print(f"\nTest Accuracy: {correct}/{total} = {round(correct/total*100, 2)}%")