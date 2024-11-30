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
        if (this.x < -this.width * 0.5) {
            this.x = -this.width * 0.5
            this.speed = 0
        }
        if (this.x > this.game.canvas.width - this.width * 0.5 - 5) {
            this.x = this.game.canvas.width - this.width * 0.5 - 5
            this.speed = 0
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
        console.log('shooting.')
        const bullet = this.game.getBullet()
        if (bullet) {
            bullet.activate()
        }
    }
}

class Bullet {
    constructor(game) {
        this.game = game
        this.width = 5
        this.height = 20
        this.x = 0
        this.y = 0
        this.speed = 10
        this.inUse = false
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.y -= this.speed
        if (this.y < 0 - this.height) {
            this.deactivate()
        }
    }
    activate() {
        this.x = this.game.player.x + this.game.player.width * 0.5
        this.y = this.game.player.y
        this.inUse = true
    }

    deactivate() {
        this.inUse = false
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.keyInputs = []
        this.bulletsPool = []
        this.numberOfBullets = 10
        this.fillBulletsPool()
        this.player = new Player(this)

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
    fillBulletsPool() {
        for (let i = 0; i < this.numberOfBullets; i++) {
            this.bulletsPool.push(new Bullet(this))
        }
    }
    getBullet() {
        for (let i = 0; i < this.bulletsPool.length; i++) {
            if (!this.bulletsPool[i].inUse) {
                return this.bulletsPool[i]
            }
        }
    }
    render(context) {
        this.player.draw(context)
        this.player.update()
        for (let i = 0; i < this.bulletsPool.length; i++) {
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
