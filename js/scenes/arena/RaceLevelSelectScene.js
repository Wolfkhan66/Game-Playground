class RaceLevelSelectScene extends Phaser.Scene {
  constructor() {
    super({key: 'RaceLevelSelectScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);

    this.player = this.registry.get('player');

    for (var i = 0; i < this.player.activeRace.levels.length; i++) {
      let level = this.player.activeRace.levels[i];
      var button = utility.createTextButton(this, 50, 300 + (200 * i), 700, level.name);
      button.getChildren()[2].on('pointerdown', (pointer) => {
        this.player.lastScene = 'RaceLevelSelectScene';
        this.player.currentEvent = 'RacingScene';
        this.player.activeLevel = level.name;
        this.player.petSelect = true;
        this.scene.start('PetScene');
      });
    }
    var backButton = utility.createTextButton(this, 250, 1150, 300, 'Back');
    backButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('RaceSelectScene');
    });

  }

  update() {}

}
