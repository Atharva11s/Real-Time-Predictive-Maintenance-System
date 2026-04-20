import random
import time
import csv
import os

class MachineDataSimulator:
    def __init__(self):
        self.temp = 30.0
        self.vibration = 1.0
        self.pressure = 100.0
        self.rpm = 1500.0
        
        self.fault_mode = False
        self.step = 0

    def generate_normal(self):
        # small natural variations
        self.temp = 30 + random.uniform(-1, 1)
        self.vibration = 1 + random.uniform(-0.2, 0.2)
        self.pressure = 100 + random.uniform(-3, 3)
        self.rpm = 1500 + random.uniform(-50, 50)

    def inject_fault(self):
        # simulate abnormal behavior
        self.temp = 40 + random.uniform(0, 5)
        self.vibration = 2 + random.uniform(0, 1)
        self.pressure = 110 + random.uniform(5, 10)
        self.rpm = 1300 - random.uniform(0, 100)

    def get_data(self):
        self.step += 1

        # randomly triggers fault
        if self.step % 50 == 0:
            self.fault_mode = True

        if self.step % 80 == 0:
            self.fault_mode = False

        if self.fault_mode:
            self.inject_fault()
        else:
            self.generate_normal()

        return {
            "temperature": round(self.temp, 2),
            "vibration": round(self.vibration, 2),
            "pressure": round(self.pressure, 2),
            "rpm": round(self.rpm, 2),
            "fault": self.fault_mode 
        }


# For testing
#if __name__ == "__main__":
#    sim = MachineDataSimulator()
   
#   while True:
#        data = sim.get_data()
#        print(data)
#        time.sleep(1)

if __name__ == "__main__":
    sim = MachineDataSimulator()

    file_path = "data/dataset.csv"
    file_exists = os.path.isfile(file_path)

    with open(file_path, mode='a', newline='') as file:
        writer = csv.writer(file)

        if not file_exists:
            writer.writerow(["temperature", "vibration", "pressure", "rpm", "fault"])

        while True:
            data = sim.get_data()

            writer.writerow([
                data["temperature"],
                data["vibration"],
                data["pressure"],
                data["rpm"],
                data["fault"]
            ])

            print(data)
            time.sleep(1)        