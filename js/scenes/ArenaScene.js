class ArenaScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'ArenaScene'});
  }
  preload() {}

  create() {
    this.player = this.registry.get('player');
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    console.log("Creating World...");
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: 'Arena Scene',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    this.racingSign = this.physics.add.sprite(100, 500, 'Player').setInteractive();
    this.racingSign.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'RacingScene';
      this.scene.start('PetScene');
    });
    this.fightingSign = this.physics.add.sprite(this.width - 100, 500, 'Player').setInteractive();
    this.fightingSign.on('pointerdown', (pointer) => {
      this.player.petSelect = true;
      this.player.currentEvent = 'FightingScene';
      this.scene.start('PetScene');
    });

    var sprite = this.add.sprite(70, this.height - 70, 'Player').setInteractive();
    sprite.on('pointerdown', (pointer) => {
      this.scene.start('MainScene');
    });
    var sprite2 = this.add.sprite(this.width - 70, this.height - 70, 'Player').setInteractive();
    sprite2.on('pointerdown', (pointer) => {
      this.scene.start('MarketPlaceScene');
    });
    console.log("Creation complete.");
  }

  update() {
    console.log("ArenaScene Update");
  }
}
