class FightingScene extends Phaser.Scene {
  constructor() {
    super({key: 'FightingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Fighting Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    this.test = this.physics.add.sprite(width - 70, height - 70, 'Pet').setInteractive();
    this.test.on('pointerdown', (pointer) => {
      player.currency += 10;
      this.scene.start('ArenaScene');
    });

  }

  update() {}

}
