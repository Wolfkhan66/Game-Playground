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
    this.groundTiles = this.physics.add.group();
    this.waterTiles = this.physics.add.group();
    utility.createAnimations(this);
    for (var i = 0; i < this.map.length; i++) {
      switch (this.map[i]) {
        case 1:
          this.groundTiles.add(this.physics.add.sprite((128 * i) + 64, 1100, 'Tile1'));
          break;
        case 2:
          this.waterTiles.add(this.physics.add.sprite((128 * i) + 64, 1100, 'Tile2'));
          break;
      }
    }
    this.raceComplete = false;
    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(0, 0, this.raceDistance, height);
    var loadingText = this.make.text({
      x: 400,
      y: 100,
      text: player.activeLevel,
      style: {
        font: '50px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setScrollFactor(0);
    loadingText.setOrigin(0.5, 0.5);
    player.activePet.sprite = this.physics.add.sprite(50, 1050, 'PetAtlas');
    player.activePet.sprite.setOrigin(0.5, 0.5);
    player.activePet.sprite.setTint(player.activePet.tint);
    player.activePet.sprite.setFlip(true);
    player.activePet.sprite.petId = player.activePet.id;

    this.cameras.main.startFollow(player.activePet.sprite, true);

    this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
    this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
      player.currency += 10;
      player.lastScene = 'ArenaScene'
      this.scene.start('ResultsScene');
    });
    this.continueButton.getChildren().forEach(function(child) {
      child.setScrollFactor(0);
    })

    this.continueButton.toggleVisible();
    this.physics.add.overlap(player.activePet.sprite, this.groundTiles, this.groundOverlap);
    this.physics.add.overlap(player.activePet.sprite, this.waterTiles, this.waterOverlap);
  }

  update() {
    if (player.activePet.sprite.x < (this.raceDistance - 40)) {} else {
      if (!this.raceComplete) {
        this.continueButton.toggleVisible();
        player.activePet.sprite.setVelocityX(0);
        this.raceComplete = true;
      }
    }
  }

  groundOverlap(petSprite, groundTile) {
    if (petSprite.anims.getCurrentKey() != 'walkLeft') {
      petSprite.play('walkLeft');
      petSprite.setFlip(true);
      player.pets.forEach(function(pet) {
        if (pet.id == petSprite.petId) {
          console.log('Pet Found');
          pet.skills.forEach(function(skill) {
            if (skill.element == 'Earth') {
              console.log(skill);
              petSprite.setVelocityX(50 + skill.level);
              console.log('Set Earth');
            }
          });
        }
      });
    }
  }

  waterOverlap(petSprite, waterTile) {
    if (petSprite.anims.getCurrentKey() != 'swim') {
      petSprite.play('swim');
      player.pets.forEach(function(pet) {
        if (pet.id == petSprite.petId) {
          console.log('Pet Found');
          pet.skills.forEach(function(skill) {
            if (skill.element == 'Water') {
              console.log(skill);
              petSprite.setVelocityX(50 + skill.level);
              console.log('Set Water');
            }
          });
        }
      });
    }
  }
}
