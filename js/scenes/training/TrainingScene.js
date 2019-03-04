class TrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var fireButton = utility.createTextButton(this, 25, 500, 350, 'Fire');
    fireButton.getChildren()[2].on('pointerdown', (pointer) => {
      player.petSelect = true;
      player.currentEvent = 'FireTrainingScene';
      player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    var waterButton = utility.createTextButton(this, 425, 500, 350, 'Water');
    waterButton.getChildren()[2].on('pointerdown', (pointer) => {
      player.petSelect = true;
      player.currentEvent = 'WaterTrainingScene';
      player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    var airButton = utility.createTextButton(this, 25, 700, 350, 'Air');
    airButton.getChildren()[2].on('pointerdown', (pointer) => {
      player.petSelect = true;
      player.currentEvent = 'AirTrainingScene';
      player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });
    var earthButton = utility.createTextButton(this, 425, 700, 350, 'Earth');
    earthButton.getChildren()[2].on('pointerdown', (pointer) => {
      player.petSelect = true;
      player.currentEvent = 'EarthTrainingScene';
      player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    var homeButton = this.physics.add.sprite(700, 1150, 'Signpost').setInteractive();
    homeButton.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });
    homeButton.setFlip(true);
    var homeIcon = this.physics.add.sprite(700, 1150, 'PetAtlas', 'Idle/Sitting/Down/1.png').setInteractive();
    homeIcon.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });
  }

  update() {
    console.log("TrainingScene Update");
  }

}
