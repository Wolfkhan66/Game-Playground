class UIScene extends Phaser.Scene {
  constructor() {
    super({key: 'UIScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.currencyText = this.make.text({
      x: 100,
      y: 40,
      text: 'Currency: ' + player.currency,
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.currencyText.setOrigin(0.5, 0.5);
  }

  update() {
    this.currencyText.text = 'Currency: ' + player.currency;
  }
}
