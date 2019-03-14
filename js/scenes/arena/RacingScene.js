class RacingScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RacingScene"
    });
  }

  preload() {
    this.map = player.activeLevel.map;
    this.raceDistance = this.map[0].length * 128;
    this.raceComplete = false;
    player.racePets = [];
    player.raceFinishPositions = [];
    this.groundTiles = this.physics.add.group();
    this.waterTiles = this.physics.add.group();
    this.climbingTiles = this.physics.add.group();
    this.climbingTopTiles = this.physics.add.group();
    this.finishTiles = this.physics.add.group();
    this.startTiles = this.physics.add.group();
  }

  create() {
    utility.createAnimations(this);

      for (var y = 0; y < this.map.length; y++) {
        let laneY = 128 * y;
        for (var x = 0; x < this.map[0].length; x++) {
          let laneX = 128 * x + 64;
          var tile;
          switch (this.map[y][x]) {
            case 1:
            tile = this.createTile(laneX,laneY,128,10,"Tile1");
              this.groundTiles.add(tile);
              break;
            case 2:
            tile = this.createTile(laneX,laneY,128,10,"Tile2");
              this.waterTiles.add(tile);
              break;
            case 3:
            tile = this.createTile(laneX,laneY,128,128, "Tile3");
              tile.body.setOffset(0,0);
            this.climbingTiles.add(tile);
              break;
            case 4:
              tile = this.createTile(laneX,laneY,128,128,"Tile1");
              tile.setVisible(false);
                  tile.body.setOffset(0,0);
            this.climbingTopTiles.add(tile);
              break;
            case 5:
            tile = this.createTile(laneX,laneY,128,10,"Tile1");
            this.finishTiles.add(tile);
              break;
              case 6:
              tile = this.createTile(laneX,laneY,128,10,"Tile1");
              this.startTiles.add(tile);
                break;
          }
        }
      }

    for (var i = 0; i < 8; i++) {
      player.racePets.push({
        PetId: i,
        Pet: this.createPet(i),
      });
    }

    this.width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.cameras.main.setBounds(
      0,
      -300,
      this.map[0].length * 128 + (64 * 7),
      this.map.length * 128 + 500
    );
    var loadingText = this.make.text({
      x: 400,
      y: 100,
      text: player.activeLevel.name,
      style: {
        font: "50px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setScrollFactor(0);
    loadingText.setOrigin(0.5, 0.5);

    this.positionText = this.make.text({
      x: 700,
      y: 100,
      text: "8/8",
      style: {
        font: "50px monospace",
        fill: "#ffffff"
      }
    });
    this.positionText.setScrollFactor(0);
    this.positionText.setOrigin(0.5, 0.5);
  }

  update() {
    if (!this.raceComplete) {
      for (var i = 0; i < player.racePets.length; i++) {
        this.setpetDepth(i);
        this.checkOverlaps(i);
      }
      this.checkPetPosition();
      this.checkRaceEnded();
    }
  }

  createPet(row){
    var pet;
    var startTile = this.startTiles.getChildren()[0];
    var startY = startTile.y - (10 * row);
    if (row == 0) {
      pet = player.activePet;
      pet.raceFinished = false;
      pet.sprite = this.physics.add.sprite(startTile.x,startY, "PetAtlas");
      this.cameras.main.startFollow(pet.sprite);
    } else {
      pet = new Pet();
      pet.sprite = this.physics.add.sprite(startTile.x,startY, "PetAtlas");
    }
    pet.sprite.setOrigin(0.5, 0.5);
    pet.sprite.setTint(pet.tint);
    pet.sprite.setFlip(true);
    pet.sprite.setGravityY(1000);
    pet.sprite.body.setOffset(0,10 * row);
    pet.sprite.petId = row;
    return pet;
  }

  createTile(x, y, bodyWidth, bodyHeight, image){
    var tile = this.physics.add.sprite(x, y, image);
    tile.setDepth(y)
    tile.body.setSize(bodyWidth, bodyHeight, false);
    tile.body.setOffset(0,90);
    return tile;
  }

  setpetDepth(i) {
    player.racePets[i].Pet.sprite.setDepth(
      player.racePets[i].Pet.sprite.y + 128
    );
  }

  checkPetPosition() {
    var positions = player.racePets
      .sort(function(a, b) {
        var x = a.Pet.sprite.x;
        var y = b.Pet.sprite.x;
        return x < y ? -1 : x > y ? 1 : 0;
      })
      .reverse();
    for (var i = 0; i < positions.length; i++) {
      if (positions[i].PetId === 7) {
        if (!positions[i].Pet.raceFinished) {
          this.positionText.text = i + 1 + "/8";
        }
      }
    }
  }

  checkRaceEnded() {
    if (!this.raceComplete && player.raceFinishPositions.length == 8) {
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
        child.setDepth(10 * 128 + 200 * 8);
      });

      this.raceComplete = true;
    }
  }

  reachedFinish(i) {
    var pet = player.racePets[i].Pet;
    if (pet.raceFinished == false) {
      pet.raceFinished = true;
      player.raceFinishPositions.push(pet);
    }
  }

  checkOverlaps(i) {
    if (
      !this.physics.overlap(
        player.racePets[i].Pet.sprite,
        this.finishTiles
      )
    ) {
      if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          this.climbingTiles
        )
      ) {
        this.climbingOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          this.groundTiles
        )
      ) {
        this.groundOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          this.startTiles
        )
      ) {
        this.groundOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          this.waterTiles
        )
      ) {
        this.waterOverlap(player.racePets[i].Pet.sprite);
      } else if (
        this.physics.overlap(
          player.racePets[i].Pet.sprite,
          this.climbingTopTiles
        )
      ) {
        this.groundOverlap(player.racePets[i].Pet.sprite);
      } else {
        this.airOverlap(player.racePets[i].Pet.sprite);
      }
    } else {
      this.reachedFinish(i);
      this.finishOverlap(player.racePets[i].Pet.sprite);
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
              petSprite.setVelocityY(0);
              petSprite.setVelocityX(50 + skill.level);
            }
          });
        }
      });
    }
  }

  finishOverlap(petSprite, finishTile) {
    if (petSprite.anims.getCurrentKey() != "celebrate") {
      petSprite.play("celebrate");
      petSprite.setGravityY(0);
      petSprite.setVelocityY(0);
      petSprite.setVelocityX(0);
    }
  }
}
