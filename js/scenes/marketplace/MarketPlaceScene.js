class MarketPlaceScene extends Phaser.Scene {
  constructor() {
    super({key: 'MarketPlaceScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var arenaButton = utility.createTextButton(this, 25, 1150, 350, 'Arena');
    arenaButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });

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
