class TitleScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'TitleScene'});
  }

  create() {
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Title Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    var sprite = this.add.sprite(400, 300, 'Player').setInteractive();
    sprite.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });

  }
  update() {}

}
