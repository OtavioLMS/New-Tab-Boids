var boids
var obstacles = []
var obs

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    boids = new Boids(150)
}

function draw() {
    background(209, 216, 224)
    // background(255)
    // background(56, 103, 214)
    boids.update()
    boids.show()
    if(obstacles.length > 0){
        obstacles.map((obstacle) => {
            obstacle.show()
        })
    }
    // if(obs != undefined){
    //     obs.complete(mouseX, mouseY)
    //     obs.show()
    // }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

// function mouseDragged(){
//     if(obs == undefined){
//         obs = new Obstacle(mouseX, mouseY)
//     }
// }

// function mouseReleased(){
//     if(obs != undefined){
//         obs.complete(mouseX, mouseY)
//         obstacles.push(obs)
//     }
    
//     obs = undefined
// }

// function keyPressed() {
//     console.log(keyCode)
//     if (keyCode === 82) {
//         location.reload()
//     }
// }



