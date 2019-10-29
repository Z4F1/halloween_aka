import webview
import time

def settings(window):
    window.load_css("body { background-color: black !important; }")

if __name__ == "__main__":
    window = webview.create_window("Fullscreen", "http://floatagoat.priv/", fullscreen=True)

    webview.start(settings, window)

    time.sleep(1)

    window.load_url("https://google.com")
