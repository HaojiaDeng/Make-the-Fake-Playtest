class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        // Player properties
        this.isCrouching = false // Initial state - not crouching
        this.speed = 200 // Default speed when standing

        // Define default and crouching speed values
        this.defaultSpeed = 200
        this.crouchSpeed = 100 // Speed while crouching
        
        // Player controls
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.crouchKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL) 
        this.statusText = scene.add.text(10, 10, 'Status: Standing', { fontSize: '16px', fill: '#FFFFFF' })
    }

    // Method to make the player crouch
    crouch() {
        if (!this.isCrouching) {
            this.isCrouching = true
            this.speed = this.crouchSpeed 
            this.statusText.setText('Status: Crouching')
        }
    }

    // Method to make the player stand up
    standUp() {
        if (this.isCrouching) {
            this.isCrouching = false
            this.speed = this.defaultSpeed 
            this.statusText.setText('Status: Standing') 
        }
    }

    // Update method to handle player input
    update() {
        // Toggle between crouching and standing with the Control key
        if (this.crouchKey.isDown && !this.isCrouching) {
            this.crouch()
        } else if (this.crouchKey.isUp && this.isCrouching) {
            this.standUp()
        }

        // Move the player with arrow keys
        if (this.cursors.left.isDown) {
            this.x -= this.speed / 60
        } else if (this.cursors.right.isDown) {
            this.x += this.speed / 60
        }

        if (this.cursors.up.isDown) {
            this.y -= this.speed / 60
        } else if (this.cursors.down.isDown) {
            this.y += this.speed / 60
        }
    }
}
