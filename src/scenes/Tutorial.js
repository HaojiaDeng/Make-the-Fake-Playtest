class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload(){
        this.load.image('BG2',"./assets/BG2.png")
    }

    create() {
        let menuConfig = {
            fontFamily: "Lucida Console", 
            fontSize: "16px",
            color: "#ffffff" 
        }
        this.BG = this.add.tileSprite(0, 0, 640, 480, 'BG2').setOrigin(0, 0)
        this.add.text(300, 150, 
         `
         Don't get spotted!
         You are ordered to pass through enemy-occupied areas
         while wearing only a ghillie suit.
         No shooting is allowed.
         While moving, you will have a greater range of being spotted.
         Use the arrow keys to move the character.
         Press the Control to crawl.
         You'll have a shorter range of detection in a creeping situation.
         GL&HF!
        
        `, menuConfig).setOrigin(0.5)

        menuConfig.fontSize = "16px";
        this.add.text(500, 400, "Press 'B' to get back to the Menu page", menuConfig).setOrigin(0.5)
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyB)) {
            this.scene.start('menuScene')
            this.sound.play('press')
        }
    }
}