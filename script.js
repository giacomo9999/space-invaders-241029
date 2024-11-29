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
        if (this.game.keyInputs[0] === 'ArrowRight') {
            this.speed += 1
        }
        if (this.game.keyInputs[0] === 'ArrowLeft') {
            this.speed -= 1
        }
        if (this.x < 0 - this.width * 0.5) {
            this.x = -this.width * 0.5
            this.speed = 0
        }
        if (this.x > this.game.canvas.width - this.width * 0.5) {
            this.x = this.game.canvas.width - this.width * 0.5
            this.speed = 0
        }
        this.x += this.speed
    }
    shoot() {
        console.log('Shooting...')
        const bullet = this.game.getBullet()
        console.log('Shoot:', bullet)
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
        if (this.y < -20) {
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
        this.keyInputs = []
        this.bulletsPool = []
        this.numberOfBullets = 10
        this.player = new Player(this)
        this.fillBulletsPool()
        console.log(this.bulletsPool)

        document.addEventListener('keydown', (e) => {
            if (this.keyInputs.indexOf(e.key) === -1) {
                this.keyInputs.push(e.key)
            }
            if (e.key === '1') {
                this.player.shoot()
            }
        })
        document.addEventListener('keyup', (e) => {
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
            console.log(this.bulletsPool[i])
            if (this.bulletsPool[i].inUse === false) {
                return this.bulletsPool[i]
            }
        }
    }

    render(context) {
        this.player.draw(context)
        this.player.update()
        this.bulletsPool.forEach((bullet) => {
            bullet.draw(context)
            bullet.update()
        })
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
