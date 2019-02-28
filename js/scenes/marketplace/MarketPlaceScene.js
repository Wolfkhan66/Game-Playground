class MarketPlaceScene extends Phaser.Scene {
  constructor() {
    super({key: 'MarketPlaceScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var arenaButton = this.physics.add.sprite(100, 1150, 'Signpost').setInteractive();
    arenaButton.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
    var arenaIcon = this.physics.add.sprite(105, 1150, 'ArenaIcon').setInteractive();
    arenaIcon.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
    arenaIcon.setScale(1.5);
    for (var i = 0; i < 3; i++) {
      var shopButton = utility.createTextButton(this, 212.5, 400 + (i * 200), 350, 'Shop ' + (
      i + 1));
      shopButton.getChildren()[2].on('pointerdown', (pointer) => {
        this.scene.start('ShopScene');
      });
    }
  }

  update() {}
}
