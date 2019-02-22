class TrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.player = this.registry.get('player');
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Training Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    this.fire = this.physics.add.sprite(100, 500, 'Pet').setInteractive();
    this.fire.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'FireTrainingScene';
      this.scene.start('PetScene');
    });
    this.water = this.physics.add.sprite(width - 100, 500, 'Pet').setInteractive();
    this.water.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'WaterTrainingScene';
      this.scene.start('PetScene');
    });
    this.air = this.physics.add.sprite(100, 700, 'Pet').setInteractive();
    this.air.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'AirTrainingScene';
      this.scene.start('PetScene');
    });
    this.earth = this.physics.add.sprite(width - 100, 700, 'Pet').setInteractive();
    this.earth.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'EarthTrainingScene';
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
