class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
    }
    update() {
        this.y += 0.5
        if (this.y > this.scene.sys.game.config.height) {
            this.setX(Phaser.Math.Between(0, this.scene.sys.game.config.width))
            this.setY(0)
        }
    }
}


