class RaceLevelSelectScene extends Phaser.Scene {
  constructor() {
    super({key: 'RaceLevelSelectScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);

    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Race Level Select Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.player = this.registry.get('player');

    for (var i = 0; i < this.player.activeRace.levels.length; i++) {
      let level = this.player.activeRace.levels[i];
      var button = this.physics.add.sprite(this.width - 400, 500 + (200 * i), 'BackButton').setInteractive();
      button.on('pointerdown', (pointer) => {
        this.player.lastScene = 'RaceLevelSelectScene';
        this.player.currentEvent = 'RacingScene';
        this.player.activeLevel = level.name;
        this.player.petSelect = true;
        this.scene.start('PetScene');
      });
    }

    this.test4 = this.physics.add.sprite(this.width - 400, height - 70, 'BackButton').setInteractive();
    this.test4.on('pointerdown', (pointer) => {
      this.scene.start('RaceSelectScene');
    });
  }

  update() {}

}
