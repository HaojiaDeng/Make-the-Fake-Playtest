class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

    }
    preload(){
        this.load.image('BG',"./assets/background.png")
        this.load.audio('press',"./assets/press.wav")
    }



    create(){
        let menuConfig = {
            fontFamily: "Lucida Console", 
            fontSize: "32px",
            color: "#ffffff" 
        };
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        let upperY = this.cameras.main.height / 4;
        this.BG = this.add.tileSprite(0, 0, 900, 480, 'BG').setOrigin(0, 0)
        this.add.text(centerX, upperY, 'Covert Operation', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "16px";
        this.playText = this.add.text(centerX, centerY, "Press 'P' to play the game.", menuConfig).setOrigin(.5).setInteractive()
        this.playText = this.add.text(centerX, centerY+64, "Press 'H' to see the tutirial.", menuConfig).setOrigin(.5).setInteractive()
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            this.scene.start('tutorialScene')
            this.sound.play('press')
        }
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start('playScene')
            this.sound.play('press')
        }
    }
}
    