class Boids {
    constructor(count, perceptions){
        this.birds = []
        if(perceptions != undefined){
            this.perceptions = perceptions
        } else {
            this.perceptions = {
                separation: 20,
                align: 90,
                cohesion: 10
            }
        }
        for(let i = 0; i < count; i++){
            this.birds[i] = new Bird(random(0, width), random(0, height), 0.1, 3)
        }
    }

    update(){
        this.birds.map((bird) => {
            bird.edges()
            bird.flock(this.birds, this.perceptions)
            bird.update()
        })
    }

    show(){
        this.birds.map((bird) => {
            bird.show()
        })
    }
}
