let socket

let canvas, ctx
let frames = 0

let gridSpace = 32


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
        i: 250,
        height: 50
    },
    {
        i: 300,
        height: 0
    },
    {
        i: 350,
        height: 0
    },
    {
        i: 375,
        height: -100
    },
    {
        i: 400,
        height: 250
    },
    {
        i: 450,
        height: 0
    }
]

function Start() {

    canvas = document.createElement("canvas")

    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    document.body.appendChild(canvas)

    ctx = canvas.getContext("2d")

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

    for(let i = 0; i < canvas.width; i++) {
        let opacity = 255;
        ctx.fillStyle = "rgba(0, 112, 0, " + opacity + ")"
        for(let j = coords.length-1; j >= 0; j--){
            if(coords[j].i > i) continue;

            let height;
            if(j == 0){
                height = 0;
            }else {
                height = map_range(coords[j].height, coords[j-1].i, i - coords[j].i, coords[j-1].height, coords[j].height);
            }

            /*

            0 - 50
            linear


            */

            ctx.fillRect(i, Math.floor(canvas.height/2)-2 - height, 1, 4)
            break;
        }
    }

    frames++;
}

function calculateHeight(x) {
    return Math.sin(x/100)*100
}

function caluclateOpacity(i) {
    return Math.sin(i/canvas.width*8)*256;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
