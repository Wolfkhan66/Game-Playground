class RaceLevelSelectScene extends Phaser.Scene {
  constructor() {
    super({key: 'RaceLevelSelectScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);
    for (var i = 0; i < player.activeRace.levels.length; i++) {
      let level = player.activeRace.levels[i];
      var button = utility.createTextButton(this, 50, 300 + (200 * i), 700, level.name);
      button.getChildren()[2].on('pointerdown', (pointer) => {
        player.lastScene = 'RaceLevelSelectScene';
        player.currentEvent = 'RacingScene';
        player.activeLevel = level;
        player.petSelect = true;
        player.activePet = player.pets[0];
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
