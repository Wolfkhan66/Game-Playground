class TitleScene extends Phaser.Scene {
  constructor() {
    super({key: 'TitleScene'});
  }

  create() {

    var titleText = this.make.text({
      x: 384,
      y: 400,
      text: 'Spirit Hollow',
      style: {
        fontFamily: '"Roboto Condensed"',
        font: '60px monospace',
        fill: '#ffffff'
      }
    });
    titleText.setOrigin(0.5, 0.5);

    var startButton = this.add.sprite(384, 800, 'StartButton').setInteractive();
    startButton.on('pointerdown', (pointer) => {
      this.scene.start('MainScene', {player: this.player});
    });
    startButton.setOrigin(0.5, 0.5);

  }

  update() {}

}
