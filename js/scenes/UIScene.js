class UIScene extends Phaser.Scene {
  constructor() {
    super({key: 'UIScene'});
  }

  preload() {}

  create() {
    this.player = this.registry.get('player');
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.currencyText = this.make.text({
      x: 100,
      y: 40,
      text: 'Currency: ' + this.player.currency,
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.currencyText.setOrigin(0.5, 0.5);
  }

  update() {
    this.currencyText.text = 'Currency: ' + this.player.currency;
  }
}
