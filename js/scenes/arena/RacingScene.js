class RacingScene extends Phaser.Scene {
  constructor() {
    super({key: 'RacingScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.width * 2, height);
    this.player = this.registry.get('player');
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Racing Scene ' + this.player.activeRace.name + this.player.activeLevel,
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    this.player.activePet.sprite = this.physics.add.sprite(50, 800, 'Pet');
    this.player.activePet.sprite.setOrigin(0.5, 0.5);
    this.player.activePet.sprite.setTint(this.player.activePet.tint);
    this.cameras.main.startFollow(this.player.activePet.sprite, true);
    this.test = this.physics.add.sprite((this.width * 2) - 400, height - 70, 'BackButton').setInteractive();
    this.test.on('pointerdown', (pointer) => {
      this.player.currency += 10;
      this.scene.start('ArenaScene');
    });
    this.test.setVisible(false);
  }

  update() {
    if (this.player.activePet.sprite.x < (this.width * 2) - 40) {
      this.player.activePet.sprite.setVelocityX(300);
    } else {
      this.test.setVisible(true);
      this.player.activePet.sprite.setVelocityX(0);
    }
  }

}
