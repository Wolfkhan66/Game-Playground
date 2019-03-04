class PetScene extends Phaser.Scene {
  constructor() {
    super({key: 'PetScene'});
  }

  preload() {}

  create() {
    utility.createAnimations(this);
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.pet = player.activePet;
    this.petInfo = this.add.group();

    var leftArrow = utility.createTextButton(this, 75, 275, 50, '<');
    leftArrow.getChildren()[2].on('pointerdown', (pointer) => {
      this.changePet('left');
    });
    var rightArrow = utility.createTextButton(this, 675, 275, 50, '>');
    rightArrow.getChildren()[2].on('pointerdown', (pointer) => {
      this.changePet('right');
    });

    this.updatePet();
    if (player.petSelect) {
      var backButton = utility.createTextButton(this, 75, 1150, 300, 'Back');
      backButton.getChildren()[2].on('pointerdown', (pointer) => {
        player.petSelect = false;
        this.scene.start(player.lastScene);
      });
      var selectButton = utility.createTextButton(this, 425, 1150, 300, 'Select');
      selectButton.getChildren()[2].on('pointerdown', (pointer) => {
        player.activePet = this.pet;
        player.petSelect = false;
        this.scene.start(player.currentEvent);
      });
    } else {
      var backButton = utility.createTextButton(this, 250, 1150, 300, 'Back');
      backButton.getChildren()[2].on('pointerdown', (pointer) => {
        this.scene.start('MainScene');
      });
    }
  }

  update() {}

  changePet(direction) {

    var index = player.pets.indexOf(this.pet);
    console.log(index);
    if (direction == 'left') {
      if (index == 0) {
        index = player.pets.length - 1;
      } else {
        index--;
      }
    } else {
      if (index == player.pets.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }
    this.pet.sprite.destroy();
    this.pet = player.pets[index];
    this.updatePet();
  }

  updatePet() {
    this.petInfo.clear(true, true);
    this.pet.sprite = this.add.sprite(this.width / 2, 300, 'PetAtlas', 'Idle/Standing/Down/1.png').setInteractive();
    this.pet.sprite.setScale(4);
    this.pet.sprite.setTint(this.pet.tint);
    this.pet.chooseAnimation('petScene');

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
