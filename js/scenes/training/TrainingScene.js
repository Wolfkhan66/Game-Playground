class TrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.player = this.registry.get('player');

    this.fire = this.physics.add.sprite(100, 500, 'Pet').setInteractive();
    this.fire.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'FireTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });
    this.water = this.physics.add.sprite(width - 100, 500, 'Pet').setInteractive();
    this.water.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'WaterTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });
    this.air = this.physics.add.sprite(100, 700, 'Pet').setInteractive();
    this.air.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'AirTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });
    this.earth = this.physics.add.sprite(width - 100, 700, 'Pet').setInteractive();
    this.earth.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'EarthTrainingScene';
      this.player.lastScene = 'TrainingScene';
      this.scene.start('PetScene');
    });

    this.test = this.physics.add.sprite(width - 70, height - 70, 'Pet').setInteractive();
    this.test.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });

  }

  update() {
    console.log("TrainingScene Update");
  }

}
