class MarketPlaceScene extends Phaser.Scene {
  constructor() {
    super({key: 'MarketPlaceScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var titleText = this.make.text({
      x: 100,
      y: 100,
      text: 'MarketPlace Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    titleText.setOrigin(0.5, 0.5);

    var sprite = this.add.sprite(70, height - 70, 'Pet').setInteractive();
    sprite.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
    for (var i = 0; i < 3; i++) {
      var shop = this.add.sprite(384, 800 - (i * -60), 'Pet').setInteractive();
      shop.on('pointerdown', (pointer) => {
        this.scene.start('ShopScene');
      });
      shop.setOrigin(0.5, 0.5);
    }
  }

  update() {
    console.log("MainScene Update");

  }
}
