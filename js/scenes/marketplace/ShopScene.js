class ShopScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'ShopScene'});
  }
  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Shop Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    var sprite = this.add.sprite(70, height - 70, 'Pet').setInteractive();
    sprite.on('pointerdown', (pointer) => {
      this.scene.start('MarketPlaceScene');
    });
  }

  update() {
    console.log("ShopScene Update");
  }
}
