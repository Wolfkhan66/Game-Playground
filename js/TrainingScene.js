class TrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Training Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    this.test = this.physics.add.sprite(width - 70, height - 70, 'Player').setInteractive();
    this.test.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });
  }

  update() {
    console.log("TrainingScene Update");
  }

}
