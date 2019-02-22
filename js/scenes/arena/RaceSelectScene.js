class RaceSelectScene extends Phaser.Scene {
  constructor() {
    super({key: 'RaceSelectScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);

    this.player = this.registry.get('player');

    for (var i = 0; i < this.player.races.length; i++) {
      let race = this.player.races[i];

      var button = utility.createTextButton(this, 250, 300 + (200 * i), 300, race.name);
      button.getChildren()[2].on('pointerdown', (pointer) => {
        this.player.activeRace = race;
        this.scene.start('RaceLevelSelectScene');
      });
    }

    var backButton = utility.createTextButton(this, 250, 1150, 300, 'Back');
    backButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });

  }

  update() {}

}
