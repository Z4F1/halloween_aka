let socket

let canvas, ctx
let frames = 0

let gridSpace = 32

let startFrame = 0

let coords = [
    {
        i: 0,
        height: 0
    },
    {
        i: 200,
        height: 0
    },
    {
        i: 225,
        height: 50
    },
    {
        i: 250,
        height: 0
    },
    {
        i: 300,
        height: 0
    },
    {
        i: 325,
        height: -100
    },
    {
        i: 350,
        height: 250
    },
    {
        i: 400,
        height: 0
    },
    {
        i: 600,
        height: 0
    },
    {
        i: 625,
        height: 50
    },
    {
        i: 650,
        height: 0
    },
    {
        i: 700,
        height: 0
    },
    {
        i: 725,
        height: -100
    },
    {
        i: 750,
        height: 250
    },
    {
        i: 800,
        height: 0
    },
    {
        i: 1000,
        height: 0
    },
    {
        i: 1025,
        height: 50
    },
    {
        i: 1050,
        height: 0
    },
    {
        i: 1100,
        height: 0
    },
    {
        i: 1125,
        height: -100
    },
    {
        i: 1150,
        height: 250
    },
    {
        i: 1200,
        height: 0
    },
    {
        i: 1400,
        height: 0
    },
    {
        i: 1425,
        height: 50
    },
    {
        i: 1450,
        height: 0
    },
    {
        i: 1500,
        height: 0
    },
    {
        i: 1525,
        height: -100
    },
    {
        i: 1550,
        height: 250
    },
    {
        i: 1600,
        height: 0
    },
    {
        i: 1800,
        height: 0
    }
]

function Start() {
    socket = io()

    canvas = document.createElement("canvas")

    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    document.body.appendChild(canvas)

    ctx = canvas.getContext("2d")

    socket.on("stopHeart", stopHeartMonitor)
    socket.on("restartHeart", ()=> {
        window.location.reload()
    })

    setInterval(Update, 1/60)
}

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#002000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#003a00"
    for (let x = 0; x < canvas.width/gridSpace + 1; x++) {
        ctx.fillRect(x*gridSpace-5, 0, 1, canvas.height)
    }
    for (let y = 0; y < canvas.width/gridSpace + 1; y++) {
        ctx.fillRect(0, y*gridSpace-5, canvas.width, 1)
    }

    let lastPos = {
        x: 0,
        y: 0
    }

    for(let i = 0; i < canvas.width; i++) {

        for(let j = 0; j < coords.length; j++){
            if(coords[j].i <= i) continue;

            let height;
            if(j == 0){
                height = 0;
            }else {
                height = calculateHeight(i, j)
            }

            ctx.beginPath()

            ctx.lineWidth = 4;

            let opacity = caluclateOpacity(frames*2 - i)
            ctx.strokeStyle = "rgba(0, 112, 0, " + opacity + ")"

            ctx.moveTo(lastPos.x, Math.floor(canvas.height/2) - lastPos.y)
            ctx.lineTo(i, Math.floor(canvas.height/2) - height)

            ctx.stroke()

            lastPos = {
                x: i,
                y: height
            }

            break;
        }
    }
    frames++;
}

function getHeartMonitorHeight(i){
    if(startFrame == 0) {
        return 1
    }else {
        return Math.max(map_range(Math.min(frames-startFrame, 480), 0, 480, 1, 0), 0) * map_range(i/canvas.width, 0, 1, 1, 0)
    }
}

function getHeartMonitorHeight(){
    if(startFrame == 0) {
        return 1
    }else {
        return 0
    }
}

function stopHeartMonitor(){
    startFrame = frames
}

function calculateHeight(i, x) {
    return ((coords[x].height - coords[x-1].height) * (i - coords[x-1].i)/(coords[x].i - coords[x-1].i) + (coords[x-1].height)) * getHeartMonitorHeight(0)
}

function caluclateOpacity(i) {
    return Math.sin(i/canvas.width*8)*256;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
