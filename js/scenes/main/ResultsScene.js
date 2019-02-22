class ResultsScene extends Phaser.Scene {
  constructor() {
    super({key: 'ResultsScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Results Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.player = this.registry.get('player');
    var resultsText;
    switch (this.player.currentEvent) {
      case 'AirTrainingScene':
        resultsText = ['Air Experience: ' + '1'];
        loadingText.text = resultsText;
        break;
      case 'FireTrainingScene':
        resultsText = ['Fire Experience: ' + '1'];
        loadingText.text = resultsText;
        break;
      case 'WaterTrainingScene':
        resultsText = ['Water Experience: ' + '1'];
        loadingText.text = resultsText;
        break;
      case 'EarthTrainingScene':
        resultsText = ['Earth Experience: ' + '1'];
        loadingText.text = resultsText;
        break;
      case 'RacingScene':
        resultsText = [
          'Currency: ' + '1',
          'Position: 1st'
        ];
        loadingText.text = resultsText;
        break;
      case 'FightingScene':
        resultsText = [
          'Currency: ' + '1',
          'Position: 1st'
        ];
        loadingText.text = resultsText;
        break;
      default:

    }

    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.activePet.skills.forEach(function(skill) {
        if (skill.element == 'Air') {
          skill.level++;
        }
      })
      this.scene.start(this.player.lastScene);
    });
  }

  update() {}

}
