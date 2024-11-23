class Player {
    constructor(game) {
        this.game = game
        this.height = 100
        this.width = 100
        this.x = this.game.canvas.width * 0.5 - this.width * 0.5
        this.y = this.game.canvas.height - this.height - 10
        this.speed = 1
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.height, this.width)
    }
    update() {
        if (this.game.inputs[0] === 'ArrowRight') {
            this.speed += 1
        }
        if (this.game.inputs[0] === 'ArrowLeft') {
            this.speed -= 1
        }

        this.x += this.speed

        if (this.x < 0 - this.width * 0.5) {
            this.speed = 0
            this.x = 0 - this.width * 0.5
        }
        if (this.x > this.game.canvas.width - this.width * 0.5) {
            this.speed = 0
            this.x = this.game.canvas.width - this.width * 0.5
        }
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.inputs = []
        this.player = new Player(this)
        document.addEventListener('keydown', (e) => {
            if (this.inputs.indexOf(e.key) === -1) {
                this.inputs.push(e.key)
            }
            console.log(this.inputs)
        })
        document.addEventListener('keyup', (e) => {
            if (this.inputs.indexOf(e.key) !== -1) {
                this.inputs.splice(this.inputs.indexOf(e.key), 1)
            }
            console.log(this.inputs)
        })
    }
    render(context) {
        this.player.draw(context)
        this.player.update()
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1')
    canvas.height = 800
    canvas.width = 600
    const ctx = canvas.getContext('2d')
    const game = new Game(canvas)
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(ctx)
        window.requestAnimationFrame(animate)
    }
    animate()
})
