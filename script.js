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
        if (this.x > this.game.width - 110) {
            this.speed = 0
            this.x = this.game.width - 110
        }
        if (this.x < 10) {
            this.speed = 0
            this.x = 10
        }
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.speed = this.speed - 1
        }
        if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.speed = this.speed + 1
        }
    }
}

class Projectile {}

class Enemy {}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.keys = []
        this.player = new Player(this)

        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
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
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1')

    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 800

    const game = new Game(canvas)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(ctx)
        window.requestAnimationFrame(animate)
    }
    animate()
})
