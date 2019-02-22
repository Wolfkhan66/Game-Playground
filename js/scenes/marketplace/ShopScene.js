class ShopScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'ShopScene'});
  }
  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var marketButton = utility.createTextButton(this, 25, 1150, 350, 'Market');
    marketButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('MarketPlaceScene');
    });
  }

  update() {}
}
