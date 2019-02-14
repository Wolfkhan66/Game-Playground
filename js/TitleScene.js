class TitleScene extends Phaser.Scene {
  constructor() {
    super({key: 'TitleScene'});
  }

  create() {
    this.player = this.registry.get('player');
    this.player.currency++;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Title Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    var sprite = this.add.sprite(400, 300, 'Player').setInteractive();
    sprite.on('pointerdown', (pointer) => {
      this.scene.start('MainScene', {player: this.player});
    });

  }
  update() {
    console.log(this.player.currency);
    console.log("TitleScene Update");
  }

}
