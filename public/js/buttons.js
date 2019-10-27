window.onload = () => {
    let socket = io()

    let btns = document.getElementById("buttons").children

    for (let i = 0; i < btns.length; i++) {
        let b = btns[i]

        b.onclick = () => {
            socket.emit("buttonPress", b.name)
        }
    }
}
