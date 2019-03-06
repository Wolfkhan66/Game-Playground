class RacingScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RacingScene"
    });
  }

  preload() {
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 3, 1, 1, 1, 1]
    ];
    this.raceDistance = this.map[0].length * 128;
  }

  create() {
    player.racePets = [];
    utility.createAnimations(this);
    for (var i = 0; i < 8; i++) {
      var groundTiles = this.physics.add.group();
      var waterTiles = this.physics.add.group();
      var climbingTiles = this.physics.add.group();
      var climbingTopTiles = this.physics.add.group();
      for (var y = 0; y < this.map.length; y++) {
        let offset = 64 * i;
        let laneY = 128 * y + 200;
        for (var x = 0; x < this.map[0].length; x++) {
          switch (this.map[y][x]) {
            case 1:
              groundTiles.add(
                this.physics.add
                  .sprite(128 * x + 64, offset + laneY, "Tile1")
                  .setDepth(offset + laneY)
              );
              break;
            case 2:
              waterTiles.add(
                this.physics.add
                  .sprite(128 * x + 64, offset + laneY, "Tile2")
                  .setDepth(offset + laneY)
              );
              break;
            case 3:
              climbingTiles.add(
                this.physics.add
                  .sprite(128 * x + 64, offset + laneY, "Tile1")
                  .setDepth(offset + laneY)
              );
              break;
            case 4:
              climbingTopTiles.add(
                this.physics.add
                  .sprite(128 * x + 64, offset + laneY, "Tile1")
                  .setVisible(false)
                  .setDepth(offset + laneY)
              );
              break;
          }
        }
      }
      var pet;
      if (i == 0) {
        pet = player.activePet;
        pet.sprite = this.physics.add.sprite(50, 0, "PetAtlas");
        this.cameras.main.startFollow(pet.sprite, true);
      } else {
        pet = new Pet();
        pet.sprite = this.physics.add.sprite(50, 0, "PetAtlas");
      }
      pet.sprite.setOrigin(0.5, 0.5);
      pet.sprite.setTint(pet.tint);
      pet.sprite.setFlip(true);
      pet.sprite.setGravityY(1000);
      pet.sprite.petId = i;
      player.racePets.push({
        Pet: pet,
        GroundTiles: groundTiles,
        WaterTiles: waterTiles,
        ClimbingTiles: climbingTiles,
        ClimbingTopTiles: climbingTopTiles
      });
    }
    console.log(player.racePets);
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
  }

  update() {
    for (var i = 0; i < player.racePets.length; i++) {
      player.racePets[i].Pet.sprite.setDepth(
        player.racePets[i].Pet.sprite.y + 128
      );
      if (player.racePets[i].Pet.sprite.x < this.raceDistance - 40) {
      } else {
        if (!this.raceComplete) {
          this.continueButton.toggleVisible();
          player.racePets[i].Pet.sprite.setVelocityX(0);
          this.raceComplete = true;
        }
      }
      if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          player.racePets[i].ClimbingTiles
        )
      ) {
        this.climbingOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          player.racePets[i].GroundTiles
        )
      ) {
        console.log("GRound Overlap: " + player.racePets[i].Pet.sprite.petId);
        this.groundOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          player.racePets[i].WaterTiles
        )
      ) {
        this.waterOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          player.racePets[i].ClimbingTopTiles
        )
      ) {
        this.groundOverlap(player.racePets[i].Pet.sprite);
      } else {
        this.airOverlap(player.racePets[i].Pet.sprite);
      }
    }
  }

  groundOverlap(petSprite, groundTile) {
    if (petSprite.anims.getCurrentKey() != "walkLeft") {
      petSprite.play("walkLeft");
      petSprite.setFlip(true);
      player.racePets.forEach(function(group) {
        if (group.Pet.sprite.petId == petSprite.petId) {
          group.Pet.skills.forEach(function(skill) {
            if (skill.element == "Earth") {
              petSprite.setGravityY(0);
              petSprite.setVelocityY(0);
              petSprite.setVelocityX(50 + skill.level);
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
      player.racePets.forEach(function(group) {
        if (group.Pet.sprite.petId == petSprite.petId) {
          group.Pet.skills.forEach(function(skill) {
            if (skill.element == "Fire") {
              petSprite.setGravityY(0);
              petSprite.setVelocityY(-50 - skill.level);
              petSprite.setVelocityX(0);
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
      player.racePets.forEach(function(group) {
        if (group.Pet.sprite.petId == petSprite.petId) {
          group.Pet.skills.forEach(function(skill) {
            if (skill.element == "Air") {
              petSprite.setGravityY(1000 - skill.level);
              petSprite.setVelocityX(40 + skill.level);
            }
          });
        }
      });
    }
  }
  waterOverlap(petSprite, waterTile) {
    if (petSprite.anims.getCurrentKey() != "swim") {
      petSprite.play("swim");
      player.racePets.forEach(function(group) {
        if (group.Pet.sprite.petId == petSprite.petId) {
          group.Pet.skills.forEach(function(skill) {
            if (skill.element == "Water") {
              petSprite.setGravityY(0);
              petSprite.setVelocityX(50 + skill.level);
            }
          });
        }
      });
    }
  }
}
