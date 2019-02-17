class PetScene extends Phaser.Scene {
  constructor() {
    super({key: 'PetScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.pet = new Pet(this);
    this.nameText = this.make.text({
      x: width / 2,
      y: 100,
      text: this.pet.name,
      style: {
        font: '40px monospace',
        fill: '#ffffff'
      }
    });
    this.nameText.setOrigin(0.5, 0.5);

    for (var i = 0; i < 7; i++) {
      var skill = this.pet.skills[i];
      var elementText = this.make.text({
        x: 100,
        y: 580 + (80 * i),
        text: skill.element,
        style: {
          font: '40px monospace',
          fill: '#ffffff'
        }
      });
      var levelBar = this.add.graphics();
      levelBar.fillStyle(0xffffff, 1);
      levelBar.fillRect(300, 590 + (80 * i), skill.level * 2, 10);
      var expBar = this.add.graphics();
      expBar.fillStyle(0x00ff00, 1);
      expBar.fillRect(300, 600 + (80 * i), skill.experience * 2, 10);

      var levelText = this.make.text({
        x: 600,
        y: 580 + (80 * i),
        text: 'Lvl ' + skill.level,
        style: {
          font: '40px monospace',
          fill: '#ffffff'
        }
      });
    }

    var startButton = this.add.sprite(384, 1200, 'StartButton').setInteractive();
    startButton.on('pointerdown', (pointer) => {
      this.scene.start('MainScene', {player: this.player});
    });
    startButton.setOrigin(0.5, 0.5);
  }

  update() {}
}
