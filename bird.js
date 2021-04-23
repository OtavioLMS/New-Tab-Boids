class Bird {
    constructor(x, y, maxForce, maxSpeed, cor){
        this.pos = createVector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = createVector()
        this.maxForce = maxForce
        this.maxSpeed = maxSpeed
        this.size = random(8, 36)
        let alpha = map(this.size, 8, 36, 100, 255)
        this.cor = (cor != undefined)? cor : color(255, 255, 255, alpha)
        // this.cor = (cor != undefined)? cor : color(209, 216, 224, alpha)
        // this.cor = (cor != undefined)? cor : color(209, 216, 224, alpha)
    }
    
    align(birds, perception){
        perception = perception * ( this.size / 30 )
        let steering = createVector()
        let total = 0
        birds.map((bird) => {
            if(bird != this){
                let dist = p5.Vector.dist(this.pos, bird.pos)
                if(dist < perception){
                    steering.add(bird.vel)
                    total++
                }
            }
        })
        if(total > 0){
            steering.div(total)
            steering.sub(this.vel)
            steering.setMag(this.maxSpeed)
            steering.limit(this.maxForce)
        }
        return steering
    }

    cohesion(birds, perception){
        perception = perception * ( this.size / 30 )
        let steering = createVector()
        let total = 0
        birds.map((bird) => {
            if(bird != this){
                let dist = p5.Vector.dist(this.pos, bird.pos)
                if(dist < perception){
                    steering.add(bird.pos)
                    total++
                }
            }
        })
        if(total > 0){
            steering.div(total)
            steering.sub(this.pos)
            steering.setMag(this.maxSpeed)
            steering.sub(this.vel)
            steering.limit(this.maxForce)
        }
        return steering
    }
    
    separation(birds, perception){
        perception = perception * ( this.size / 30 )
        let steering = createVector()
        let total = 0
        birds.map((bird) => {
            if(bird != this){
                let dist = p5.Vector.dist(this.pos, bird.pos)
                if(dist < perception){
                    let diff = p5.Vector.sub(this.pos, bird.pos)
                    diff.mult(dist)
                    steering.add(diff)
                    total++
                }
            }
        })
        if(total > 0){
            steering.div(total)
            steering.setMag(this.maxSpeed)
            steering.sub(this.vel)
            steering.limit(this.maxForce)
        }
        return steering
    }

    flock(birds, perceptions){
        let separation = this.separation(birds, perceptions.separation)
        let alignment = this.align(birds, perceptions.align)
        let cohesion = this.cohesion(birds, perceptions.cohesion)
        this.acc.add(separation)
        this.acc.add(alignment)
        this.acc.add(cohesion)
    }

    update(){
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed)
    }

    edges(reflect){
        if(!reflect){
            if(this.pos.x > width){
                this.pos.x = 0
            } else if(this.pos.x < 0){
                this.pos.x = width
            }
            if(this.pos.y > height){
                this.pos.y = 0
            } else if(this.pos.y < 0){
                this.pos.y = height
            }
        } else {
            if(this.pos.x > width){
                this.vel = this.vel.reflect(createVector(-1,0))
            } else if(this.pos.x < 0){
                this.vel = this.vel.reflect(createVector(1,0))
            }
            if(this.pos.y > height){
                this.vel = this.vel.reflect(createVector(0,-1))
            } else if(this.pos.y < 0){
                this.vel = this.vel.reflect(createVector(0,1))
            }
        }
        
    }
    
    show(){
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading() - HALF_PI)
        noStroke()
        fill(this.cor)
        // fill(209, 216, 224, 100)
        let pontas = map(this.size, 8, 36, 4, 8)
        let pontaFrente = map(this.size, 8, 36, 8, 16)
        triangle(-pontas, -pontas, pontas, -pontas, 0, pontaFrente)
        // triangle(-6, -6, 6, -6, 0, 10)
        // ellipse(this.pos.x, this.pos.y, this.size)
        pop()
    }
}
