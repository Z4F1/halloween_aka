import time
import requests

import sounddevice as sd
import soundfile as sf

from pyfirmata import Arduino, util

led = 12

if __name__ == "__main__":

    datascream, fsscream = sf.read("public/audio/baby_scare.wav", dtype="float32")

    databad, fsbad = sf.read("public/audio/baby_bad.wav", dtype="float32")
    sd.play(databad, fsbad)

    ardu = Arduino("COM3")

    servo = ardu.get_pin("d:5:s")

    time.sleep(0.5)
    servo.write(0)

    ardu.digital[12].write(1)
    time.sleep(10)

    for i in range(10):
        ardu.digital[12].write(0)
        print("off")
        time.sleep(0.1)

        ardu.digital[12].write(1)
        print("on")
        time.sleep(0.1)


    ardu.digital[12].write(0)
    print("off")

    r = requests.get("http://localhost:8080/cardiogram/stop")

    print(r.text)
    time.sleep(5)

    sd.play(datascream, fsscream)
    time.sleep(0.25)

    ardu.digital[12].write(1)
    servo.write(125)

    time.sleep(0.3)

    for i in range(40):
        ardu.digital[12].write(0)
        print("off")
        time.sleep(0.1)

        ardu.digital[12].write(1)
        print("on")
        time.sleep(0.1)


    print("baby down")
    servo.write(0)

    r = requests.get("http://localhost:8080/cardiogram/restart")

    print(r.text)
    ardu.digital[12].write(0)

    time.sleep(1)
