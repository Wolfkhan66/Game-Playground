class AirTrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'AirTrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Air Training Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.player = this.registry.get('player');

    this.test = this.physics.add.sprite(width - 70, height - 70, 'Player').setInteractive();
    this.test.on('pointerdown', (pointer) => {
      this.player.activePet.skills.forEach(function(skill) {
        if (skill.element == 'Air') {
          skill.level++;
        }
      })
      this.scene.start('TrainingScene');
    });

  }

  update() {}

}
