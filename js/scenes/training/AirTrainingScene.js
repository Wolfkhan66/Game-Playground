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

    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      player.activePet.skills.forEach(function(skill) {
        if (skill.element == 'Air') {
          skill.level++;
        }
      })
      this.scene.start('ResultsScene');
    });
  }

  update() {}

}
