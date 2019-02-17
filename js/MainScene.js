class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'MainScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var titleText = this.make.text({
      x: 100,
      y: 100,
      text: 'Main Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    titleText.setOrigin(0.5, 0.5);

    var trainingSign = this.add.sprite(70, height - 70, 'Player').setInteractive();
    trainingSign.on('pointerdown', (pointer) => {
      this.scene.start('TrainingScene');
    });

    var arenaSign = this.add.sprite(width - 70, height - 70, 'Player').setInteractive();
    arenaSign.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });

    var pet = this.add.sprite(384, 800, 'Player').setInteractive();
    pet.on('pointerdown', (pointer) => {
      this.scene.start('PetScene');
    });
    pet.setOrigin(0.5, 0.5);
  }

  update() {
    console.log("MainScene Update");

  }
}
