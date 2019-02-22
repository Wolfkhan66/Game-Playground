class RaceSelectScene extends Phaser.Scene {
  constructor() {
    super({key: 'RaceSelectScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);

    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Race Select Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.player = this.registry.get('player');

    for (var i = 0; i < this.player.races.length; i++) {
      let race = this.player.races[i];
      var test = this.physics.add.sprite(this.width - 400, 500 + (200 * i), 'BackButton').setInteractive();
      test.on('pointerdown', (pointer) => {
        this.player.activeRace = race;
        this.scene.start('RaceLevelSelectScene');
      });
    }

    this.test4 = this.physics.add.sprite(this.width - 400, height - 70, 'BackButton').setInteractive();
    this.test4.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
  }

  update() {}

}
