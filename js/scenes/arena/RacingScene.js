class RacingScene extends Phaser.Scene {
  constructor() {
    super({key: 'RacingScene'});
  }

  preload() {
    this.map = [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    this.raceDistance = this.map.length * 128;
  }

  create() {
    utility.createAnimations(this);
    for (var i = 0; i < this.map.length; i++) {
      switch (this.map[i]) {
        case 1:
          var tile = this.physics.add.sprite((128 * i) + 64, 1100, 'Tile1');
          break;
        case 2:
          var tile = this.physics.add.sprite((128 * i) + 64, 1100, 'Tile2');
          break;
      }
    }
    this.raceComplete = false;
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.raceDistance, height);
    this.player = this.registry.get('player');
    var loadingText = this.make.text({
      x: 400,
      y: 100,
      text: this.player.activeLevel,
      style: {
        font: '50px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setScrollFactor(0);
    loadingText.setOrigin(0.5, 0.5);
    this.player.activePet.sprite = this.physics.add.sprite(50, 1050, 'PetAtlas');
    this.player.activePet.sprite.setOrigin(0.5, 0.5);
    this.player.activePet.sprite.setTint(this.player.activePet.tint);
    this.player.activePet.sprite.play('walkLeft');
    this.player.activePet.sprite.setFlip(true);
    this.cameras.main.startFollow(this.player.activePet.sprite, true);

    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.currency += 10;
      this.player.lastScene = 'ArenaScene'
      this.scene.start('ResultsScene');
    });
    this.continueButton.getChildren().forEach(function(child) {
      child.setScrollFactor(0);
    })

    this.continueButton.toggleVisible();
  }

  update() {
    if (this.player.activePet.sprite.x < (this.raceDistance - 40)) {
      this.player.activePet.sprite.setVelocityX(150);
    } else {
      if (!this.raceComplete) {
        this.continueButton.toggleVisible();
        this.player.activePet.sprite.setVelocityX(0);
        this.raceComplete = true;
      }
    }
  }

}
