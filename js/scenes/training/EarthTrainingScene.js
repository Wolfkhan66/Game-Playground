class EarthTrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'EarthTrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Earth Training Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.player = this.registry.get('player');
    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.activePet.skills.forEach(function(skill) {
        if (skill.element == 'Earth') {
          skill.level++;
        }
      })
      this.scene.start('ResultsScene');
    });
  }

  update() {}

}
