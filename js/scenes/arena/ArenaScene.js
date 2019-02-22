class ArenaScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'ArenaScene'});
  }
  preload() {}

  create() {
    this.player = this.registry.get('player');
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    console.log("Creating World...");

    var racingButton = utility.createTextButton(this, 25, 500, 350, 'Racing');
    racingButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.currentEvent = 'RaceSelectScene';
      this.scene.start('RaceSelectScene');
    });

    var fightingButton = utility.createTextButton(this, 425, 500, 350, 'Fighting');
    fightingButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'FightingScene';
      this.scene.start('PetScene');
    });

    var homeButton = utility.createTextButton(this, 25, 1150, 350, 'Home');
    homeButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });

    var marketButton = utility.createTextButton(this, 425, 1150, 350, 'Market');
    marketButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('MarketPlaceScene');
    });
  }

  update() {
    console.log("ArenaScene Update");
  }
}
