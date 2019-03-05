class RacingScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RacingScene"
    });
  }

  preload() {
    this.map = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1];

    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 3, 1, 1, 1, 1]
    ];
    this.raceDistance = this.map[0].length * 128;
  }

  create() {
    this.groundTiles = this.physics.add.group();
    this.waterTiles = this.physics.add.group();
    this.climbingTiles = this.physics.add.group();
    this.climbingTopTiles = this.physics.add.group();
    utility.createAnimations(this);
    for (var y = 0; y < this.map.length; y++) {
      for (var x = 0; x < this.map[0].length; x++) {
        switch (this.map[y][x]) {
          case 1:
            this.groundTiles.add(
              this.physics.add.sprite(128 * x + 64, 128 * y + 864, "Tile1")
            );
            break;
          case 2:
            this.waterTiles.add(
              this.physics.add.sprite(128 * x + 64, 128 * y + 864, "Tile2")
            );
            break;
          case 3:
            this.climbingTiles.add(
              this.physics.add.sprite(128 * x + 64, 128 * y + 864, "Tile1")
            );
            break;
          case 4:
            this.climbingTopTiles.add(
              this.physics.add
                .sprite(128 * x + 64, 128 * y + 864, "Tile1")
                .setVisible(false)
            );
            break;
        }
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
        font: "50px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setScrollFactor(0);
    loadingText.setOrigin(0.5, 0.5);
    player.activePet.sprite = this.physics.add.sprite(50, 1050, "PetAtlas");
    player.activePet.sprite.setOrigin(0.5, 0.5);
    player.activePet.sprite.setTint(player.activePet.tint);
    player.activePet.sprite.setFlip(true);
    player.activePet.sprite.setGravityY(1000);
    player.activePet.sprite.petId = player.activePet.id;

    this.cameras.main.startFollow(player.activePet.sprite, true);

    this.continueButton = utility.createTextButton(
      this,
      150,
      1150,
      500,
      "Continue"
    );
    this.continueButton.getChildren()[2].on("pointerdown", pointer => {
      player.currency += 10;
      player.lastScene = "ArenaScene";
      this.scene.start("ResultsScene");
    });
    this.continueButton.getChildren().forEach(function(child) {
      child.setScrollFactor(0);
    });

    this.continueButton.toggleVisible();
    this.physics.add.overlap(
      player.activePet.sprite,
      this.groundTiles,
      this.groundOverlap
    );
    this.physics.add.overlap(
      player.activePet.sprite,
      this.waterTiles,
      this.waterOverlap
    );
    this.physics.add.overlap(
      player.activePet.sprite,
      this.climbingTiles,
      this.climbingOverlap
    );
    this.physics.add.overlap(
      player.activePet.sprite,
      this.climbingTopTiles,
      this.groundOverlap
    );
  }

  update() {
    if (player.activePet.sprite.x < this.raceDistance - 40) {
    } else {
      if (!this.raceComplete) {
        this.continueButton.toggleVisible();
        player.activePet.sprite.setVelocityX(0);
        this.raceComplete = true;
      }
    }
    if (
      !this.physics.overlap(player.activePet.sprite, this.climbingTiles) &&
      !this.physics.overlap(player.activePet.sprite, this.groundTiles) &&
      !this.physics.overlap(player.activePet.sprite, this.climbingTopTiles) &&
      !this.physics.overlap(player.activePet.sprite, this.waterTiles)
    ) {
      this.airOverlap(player.activePet.sprite);
    }
  }

  groundOverlap(petSprite, groundTile) {
    if (petSprite.anims.getCurrentKey() != "walkLeft") {
      petSprite.play("walkLeft");
      petSprite.setFlip(true);
      player.pets.forEach(function(pet) {
        if (pet.id == petSprite.petId) {
          console.log("Pet Found");
          pet.skills.forEach(function(skill) {
            if (skill.element == "Earth") {
              console.log(skill);
              petSprite.setGravityY(0);
              petSprite.setVelocityY(0);
              petSprite.setVelocityX(50 + skill.level);
              console.log("Set Earth");
            }
          });
        }
      });
    }
  }
  climbingOverlap(petSprite, groundTile) {
    if (petSprite.anims.getCurrentKey() != "climb") {
      petSprite.play("climb");
      petSprite.setFlip(true);
      player.pets.forEach(function(pet) {
        if (pet.id == petSprite.petId) {
          console.log("Pet Found");
          pet.skills.forEach(function(skill) {
            if (skill.element == "Fire") {
              console.log(skill);
              petSprite.setGravityY(0);
              petSprite.setVelocityY(-50 - skill.level);
              petSprite.setVelocityX(0);
              console.log("Set Fire");
            }
          });
        }
      });
    }
  }
  airOverlap(petSprite) {
    if (petSprite.anims.getCurrentKey() != "fly") {
      petSprite.play("fly");
      petSprite.setFlip(true);
      player.pets.forEach(function(pet) {
        if (pet.id == petSprite.petId) {
          console.log("Pet Found");
          pet.skills.forEach(function(skill) {
            if (skill.element == "Air") {
              console.log(skill);
              petSprite.setGravityY(1000 - skill.level);
              petSprite.setVelocityX(40 + skill.level);
              console.log("Set Air");
            }
          });
        }
      });
    }
  }
  waterOverlap(petSprite, waterTile) {
    if (petSprite.anims.getCurrentKey() != "swim") {
      petSprite.play("swim");
      player.pets.forEach(function(pet) {
        if (pet.id == petSprite.petId) {
          console.log("Pet Found");
          pet.skills.forEach(function(skill) {
            if (skill.element == "Water") {
              console.log(skill);
              petSprite.setGravityY(0);
              petSprite.setVelocityX(50 + skill.level);
              console.log("Set Water");
            }
          });
        }
      });
    }
  }
}
