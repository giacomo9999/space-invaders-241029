class Player {
    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height - this.height - 20
        this.speed = 0
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.x = this.x + this.speed
        if (this.x > this.game.width - this.width * 0.5) {
            this.speed = 0
            this.x = this.game.width - this.width * 0.5
        }
        if (this.x < 0 - this.width * 0.5) {
            this.speed = 0
            this.x = -this.width * 0.5
        }
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.speed = this.speed - 1
        }
        if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.speed = this.speed + 1
        }
    }

    shoot() {
        console.log('Shooting!')
        const projectile = this.game.getProjectile()
        if (projectile) {
            projectile.start(this.x + this.width / 2, this.y)
        }
    }
}

class Projectile {
    constructor() {
        this.width = 4
        this.height = 20
        this.x = 0
        this.y = 0
        this.speed = 20
        this.unused = true
    }
    draw(context) {
        if (!this.unused) {
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    update() {
        if (!this.unused) {
            this.y -= this.speed
        }
        if (this.y < 0) {
            this.reset()
        }
    }
    start(x, y) {
        this.x = x - this.width * 0.5
        this.y = y
        this.unused = false
    }
    reset() {
        this.unused = true
    }
}

class Enemy {}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.keys = []
        this.player = new Player(this)

        this.projectilesPool = []
        this.numberOfProjectiles = 10
        this.createProjectiles()

        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
            if (e.key === '1') {
                this.player.shoot()
            }
            console.log('this.keys: ', this.keys)
        })

        window.addEventListener('keyup', (e) => {
            if (this.keys.indexOf(e.key) > -1) {
                this.keys.length = 0
            }
            console.log('this.keys: ', this.keys)
        })
    }

    render(context) {
        this.player.draw(context)
        this.player.update()
        this.projectilesPool.forEach((projectile) => {
            projectile.update()
            projectile.draw(context)
        })
    }

    createProjectiles() {
        console.log('Creating projectiles...')
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilesPool.push(new Projectile())
        }
    }

    getProjectile() {
        console.log('Getting projectile...')
        for (let i = 0; i < this.projectilesPool.length; i++) {
            console.log(i, this.projectilesPool[i].unused)
            if (this.projectilesPool[i].unused) {
                console.log(`Projectile ${i} is unused`)
                return this.projectilesPool[i]
            }
        }
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1')

    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 800
    ctx.fillStyle = 'white'

    const game = new Game(canvas)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(ctx)
        window.requestAnimationFrame(animate)
    }
    animate()
})
