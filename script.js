class Player {
    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100
        this.x = this.game.canvas.width * 0.5 - this.width * 0.5
        this.y = this.game.canvas.height - this.height - 10
        this.speed = 1
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        if (this.x < 0 - this.width * 0.5 + 5) {
            this.x = 0 - this.width * 0.5
            this.speed = 0
            this.x = 0 - this.width * 0.5 + 5
        }
        if (this.x > this.game.canvas.width - this.width * 0.5 - 5) {
            this.speed = 0
            this.x = this.game.canvas.width - this.width * 0.5 - 5
        }
        if (this.game.keyInputs[0] === 'ArrowRight') {
            this.speed += 1
        }
        if (this.game.keyInputs[0] === 'ArrowLeft') {
            this.speed -= 1
        }
        this.x += this.speed
    }
    shoot() {
        const bullet = this.game.getBullet()
        if (bullet) {
            bullet.activate(this.x, this.y)
        }
    }
}

class Bullet {
    constructor(game) {
        this.game = game
        this.width = 5
        this.height = 20
        this.x = this.game.player.x
        this.y = this.game.player.y
        this.speed = 10
        this.inUse = false
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.y -= this.speed
        if (this.y < 0 - this.height) {
            this.inUse = false
        }
    }
    activate(x, y) {
        this.inUse = true
        this.x = x + this.game.player.width * 0.5
        this.y = y
    }

    deactivate() {
        this.inUse = false
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.player = new Player(this)
        this.keyInputs = []
        this.bulletsPool = []
        this.numberOfBullets = 10
        console.log(this.player.game)
        this.initializeBulletsPool()

        document.addEventListener('keydown', (e) => {
            if (this.keyInputs.indexOf(e.key) === -1) {
                this.keyInputs.push(e.key)
            }
            if (e.key === '1') {
                this.player.shoot()
            }
        })

        document.addEventListener('keyup', () => {
            this.keyInputs.length = 0
        })
    }

    initializeBulletsPool() {
        for (let i = 0; i < this.numberOfBullets; i++) {
            this.bulletsPool.push(new Bullet(this))
        }
        console.log(this.bulletsPool)
    }
    getBullet() {
        for (let i = 0; i < this.numberOfBullets; i++) {
            if (!this.bulletsPool[i].inUse) {
                console.log('Bullet available')
                return this.bulletsPool[i]
            }
        }
    }
    render(context) {
        this.player.draw(context)
        this.player.update()
        for (let i = 0; i < this.numberOfBullets; i++) {
            if (this.bulletsPool[i].inUse) {
                this.bulletsPool[i].draw(context)
                this.bulletsPool[i].update()
            }
        }
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1')
    canvas.width = 600
    canvas.height = 800
    const ctx = canvas.getContext('2d')
    const game = new Game(canvas)
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(ctx)
        window.requestAnimationFrame(animate)
    }
    animate()
})
