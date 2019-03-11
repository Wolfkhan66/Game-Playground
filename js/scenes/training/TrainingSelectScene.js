class TrainingSelectScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingSelectScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var fireButton = utility.createTextButton(this, 25, 500, 350, 'Fire');
    fireButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.selectTraining('Fire');
    });

    var waterButton = utility.createTextButton(this, 425, 500, 350, 'Water');
    waterButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.selectTraining('Water');
    });

    var airButton = utility.createTextButton(this, 25, 700, 350, 'Air');
    airButton.getChildren()[2].on('pointerdown', (pointer) => {
        this.selectTraining('Air');
    });
    var earthButton = utility.createTextButton(this, 425, 700, 350, 'Earth');
    earthButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.selectTraining('Earth');
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

  selectTraining(training){
    player.petSelect = true;
    player.training = training;
    player.currentEvent = 'TrainingScene';
    player.lastScene = 'TrainingSelectScene';
    this.scene.start('PetScene');
  }

}
