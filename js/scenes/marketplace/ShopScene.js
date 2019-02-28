class ShopScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'ShopScene'});
  }
  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var marketButton = this.physics.add.sprite(100, 1150, 'Signpost').setInteractive();
    marketButton.on('pointerdown', (pointer) => {
      this.scene.start('MarketPlaceScene');
    });

  }

  update() {}
}
