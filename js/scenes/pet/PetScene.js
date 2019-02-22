class PetScene extends Phaser.Scene {
  constructor() {
    super({key: 'PetScene'});
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.player = this.registry.get('player');
    this.pet = this.player.activePet;
    this.petInfo = this.add.group();
    this.leftArrow = this.add.sprite(100, 300, 'Pet').setInteractive();
    this.leftArrow.on('pointerdown', (pointer) => {
      this.changePet('left');
    });
    this.rightArrow = this.add.sprite(668, 300, 'Pet').setInteractive();
    this.rightArrow.on('pointerdown', (pointer) => {
      this.changePet('right');
    });

    this.updatePet();
    if (this.player.petSelect) {
      var backButton = this.add.sprite(193, 1200, 'BackButton').setInteractive();
      backButton.on('pointerdown', (pointer) => {
        this.player.petSelect = false;
        this.scene.start(this.player.lastScene);
      });
      backButton.setOrigin(0.5, 0.5);
      var selectButton = this.add.sprite(575, 1200, 'SelectButton').setInteractive();
      selectButton.on('pointerdown', (pointer) => {
        this.player.activePet = this.pet;
        this.player.petSelect = false;
        this.scene.start(this.player.currentEvent);
      });
      selectButton.setOrigin(0.5, 0.5);

    } else {
      var backButton = this.add.sprite(384, 1200, 'BackButton').setInteractive();
      backButton.on('pointerdown', (pointer) => {
        this.scene.start('MainScene');
      });
      backButton.setOrigin(0.5, 0.5);

    }

  }

  update() {}

  changePet(direction) {
    console.log(direction);
    var index = this.player.pets.indexOf(this.pet);
    if (direction == 'left') {
      if (index == 0) {
        index = this.player.pets.length - 1;
      } else {
        index--;
      }
    } else {
      if (index == 3) {
        index = 0;
      } else {
        index++;
      }
    }
    this.pet = this.player.pets[index];
    this.updatePet();
  }

  updatePet() {
    this.petInfo.clear(true, true);
    this.pet.sprite = this.add.sprite(this.width / 2, 300, 'Pet').setInteractive();
    this.pet.sprite.setScale(4);
    this.pet.sprite.setTint(this.pet.tint);
    var nameText = this.make.text({
      x: this.width / 2,
      y: 100,
      text: this.pet.name,
      style: {
        font: '40px monospace',
        fill: '#ffffff'
      }
    });
    nameText.setOrigin(0.5, 0.5);
    this.petInfo.add(nameText);
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
      this.petInfo.add(levelText);
      this.petInfo.add(elementText);
      this.petInfo.add(levelBar);
      this.petInfo.add(expBar);
    }
  }

}
