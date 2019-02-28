class TrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.player = this.registry.get('player');

    var fireButton = utility.createTextButton(this, 25, 500, 350, 'Fire');
    fireButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'FireTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    var waterButton = utility.createTextButton(this, 425, 500, 350, 'Water');
    waterButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'WaterTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    var airButton = utility.createTextButton(this, 25, 700, 350, 'Air');
    airButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'AirTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });
    var earthButton = utility.createTextButton(this, 425, 700, 350, 'Earth');
    earthButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'EarthTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    var homeButton = this.physics.add.sprite(700, 1150, 'Signpost').setInteractive();
    homeButton.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });
    homeButton.setFlip(true);
  }

  update() {
    console.log("TrainingScene Update");
  }

}
