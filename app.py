from flask import Flask, jsonify, render_template
import joblib
from data_simulator import MachineDataSimulator

app = Flask(__name__)

# Load trained model
model = joblib.load("model/isolation_forest.pkl")

# Initialize simulator
simulator = MachineDataSimulator()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/data")
def get_data():
    data = simulator.get_data()

    # Prepare input for model
    features = [[
        data["temperature"],
        data["vibration"],
        data["pressure"],
        data["rpm"]
    ]]

    prediction = model.predict(features)[0]

    # Convert output
    anomaly = 1 if prediction == -1 else 0

    response = {
        "temperature": data["temperature"],
        "vibration": data["vibration"],
        "pressure": data["pressure"],
        "rpm": data["rpm"],
        "fault": data["fault"],         # actual (for demo)
        "anomaly": anomaly              # ML prediction
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)