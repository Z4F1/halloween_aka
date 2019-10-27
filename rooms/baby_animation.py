import time

frames = 0

if __name__ == "__main__":

    while True:
        frames += 1

        if frames == 120:
            print("off")

        if frames == 125:
            print("on")

        if frames == 170:
            print("off")

        if frames == 175:
            print("on")

        if frames == 200:
            break

        time.sleep(1/60)
