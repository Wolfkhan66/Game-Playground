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

    var testButton = this.make.text({
      x: 384,
      y: 800,
      text: 'Start',
      style: {
        fontFamily: '"Roboto Condensed"',
        font: '40px monospace',
        fill: '#ffffff',
        backgroundColor: '#ff00ff',
        padding: {
          x: 100,
          y: 10
        }
      }
    });
    testButton.setOrigin(0.5, 0.5);
    testButton.setInteractive();
    testButton.on('pointerout', (pointer) => {
      testButton.setStyle({backgroundColor: '#ff00ff', fill: '#ffffff'});
    });
    testButton.on('pointerdown', (pointer) => {
      testButton.setStyle({backgroundColor: '#ffffff', fill: '#ff00ff'});
    });
    testButton.on('pointerup', (pointer) => {
      this.scene.start('MainScene');
    });
  }

  update() {}

}
