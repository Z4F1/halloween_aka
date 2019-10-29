import time

from pyfirmata import Arduino, util

if __name__ == "__main__":
    ardu = Arduino("COM3")

    servo = ardu.get_pin("d:5:s")

    time.sleep(1)
    servo.write(255)
    time.sleep(1)
    servo.write(0)
