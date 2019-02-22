class RacingScene extends Phaser.Scene {
  constructor() {
    super({key: 'RacingScene'});
  }

  preload() {}

  create() {
    this.raceComplete = false;
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);
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
    this.player.activePet.sprite = this.physics.add.sprite(50, 800, 'Pet');
    this.player.activePet.sprite.setOrigin(0.5, 0.5);
    this.player.activePet.sprite.setTint(this.player.activePet.tint);
    this.cameras.main.startFollow(this.player.activePet.sprite, true);

    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.player.currency += 10;
      this.scene.start('ArenaScene');
    });
    this.continueButton.getChildren().forEach(function(child) {
      child.setScrollFactor(0);
    })

    this.continueButton.toggleVisible();
  }

  update() {
    if (this.player.activePet.sprite.x < (this.width * 2) - 40) {
      this.player.activePet.sprite.setVelocityX(300);
    } else {
      if (!this.raceComplete) {
        this.continueButton.toggleVisible();
        this.player.activePet.sprite.setVelocityX(0);
        this.raceComplete = true;
      }
    }
  }

}
