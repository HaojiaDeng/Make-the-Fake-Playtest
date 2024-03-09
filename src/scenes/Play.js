class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map', './assets/map.png')
        this.load.image('player', './assets/player.png')
        this.load.image('enemy', './assets/enemy.png')
        this.load.audio('spot','./assets/explosion.wav')
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 720, 'map').setOrigin(0, 0)
        this.player = new Player(this, 200, 200, 'player').setOrigin(0, 0)
        this.physics.world.setBounds(0, 0, 1280, 720)
        this.cameras.main.setBounds(0, 0, 1280, 720)
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05)

        // Create an empty group to store enemies
        this.enemies = this.add.group()

        // Set up a timer to spawn enemies
        this.enemySpawnTimer = this.time.addEvent({
            delay: 1000, // Spawn an enemy every 1000 milliseconds
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
        // Keep track of the number of enemies spawned
        this.enemyCount = 0
        this.maxEnemies = 6
        this.gameOver = false
    }

    spawnEnemy() {
        // Check if maximum number of enemies has been reached
        if (this.enemies.getChildren().length < this.maxEnemies) {
            // Get the current array of generated enemies
            const currentEnemies = this.enemies.getChildren()
            let canSpawn = true;
    
            // Get the x-coordinate for the new enemy
            const x = Phaser.Math.Between(0, 1280)
    
            // Check if the current position is suitable for spawning a new enemy
            currentEnemies.forEach(enemy => {
                // If the distance between the current enemy and the new one is less than 150 pixels, do not spawn a new enemy
                if (Math.abs(enemy.x - x) < 150) {
                    canSpawn = false;
                }
            })
    
            // If a new enemy can be spawned, create it
            if (canSpawn) {
                const enemy = new Enemy(this, x, 0, 'enemy')
                this.enemies.add(enemy);
            }
        }
    }
    

    update() {
        // Update player and enemies' states if the game is not over
        if (!this.gameOver) {
            this.player.update()
            this.enemies.getChildren().forEach(enemy => {
                enemy.update() 
                const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y)
                const detectionRange = this.player.isCrouching ? 10 : 60;
                if (distance < detectionRange) {   
                    this.sound.play('spot')
                    this.gameOver = true
                    this.player.setActive(false).setVisible(false)
                    this.enemies.getChildren().forEach(enemy => {
                        enemy.setActive(false).setVisible(false)// Hide all enemies
                    })
                    // Display game over text with instructions to restart or go back to menu
                    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You have been spotted! Press (R) to Restart or (B) to get to Menu', { fontSize: '16px'}).setOrigin(0.5)
                }
            })
        } else {
   
            if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
                this.scene.restart() // Restart the scene
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
                this.scene.start('menuScene') // Go back to the menu scene
            }
        }
    }
    
}
