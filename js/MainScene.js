class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'MainScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Main Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    var sprite = this.add.sprite(70, height - 70, 'Player').setInteractive();
    sprite.on('pointerdown', (pointer) => {
      this.scene.start('TrainingScene');
    });
    var sprite2 = this.add.sprite(width - 70, height - 70, 'Player').setInteractive();
    sprite2.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
  }

  update() {
    console.log("MainScene Update");

  }
}
