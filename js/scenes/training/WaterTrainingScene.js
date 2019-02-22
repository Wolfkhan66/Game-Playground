class WaterTrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'WaterTrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Water Training Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.player = this.registry.get('player');

    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.activePet.skills.forEach(function(skill) {
        if (skill.element == 'Water') {
          skill.level++;
        }
      })
      this.scene.start('ResultsScene');
    });
  }

  update() {}

}
