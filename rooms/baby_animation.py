import time
import requests

frames = 0

if __name__ == "__main__":

    time.sleep(2)

    r = requests.get("localhost:8080/cardiogram/stop")

    print(r.text)
