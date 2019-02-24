class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'MainScene'});
  }

  preload() {}

  create() {
    this.scene.launch('UIScene');
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var trainingButton = utility.createTextButton(this, 25, 1150, 350, 'Training');
    trainingButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('TrainingScene');
    });
    var arenaButton = utility.createTextButton(this, 425, 1150, 350, 'Arena');
    arenaButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });

    var frameNames = this.anims.generateFrameNames('PetAtlas');
    var walkingFrames = frameNames.filter(function(frame) {
      return frame.frame.includes('WalkingLeft');
    }).sort(function(a, b) {
      return a.frame.localeCompare(b.frame, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });

    console.log(walkingFrames);

    this.anims.create({key: 'walkLeft', frames: walkingFrames, frameRate: 5, repeat: -1});
    this.player = this.registry.get('player');
    var path = new Phaser.Curves.Line([100, 100, 500, 200]);
    for (var i = 0; i < this.player.pets.length; i++) {
      var x = Phaser.Math.Between(100, 700);
      var y = Phaser.Math.Between(100, 1100);
      let pet = this.player.pets[i];
      pet.light = this.add.particles('Particle').createEmitter({
        x: x,
        y: y,
        quantity: 50,
        gravityY: -30,
        scale: {
          start: 0.4,
          end: 0,
          ease: 'Linear'
        },
        tint: pet.tint,
        speed: {
          min: -100,
          max: -100
        },
        alpha: {
          start: 0.1,
          end: 0,
          ease: 'Linear'
        },
        angle: {
          min: 0,
          max: 360
        }
      });
      pet.sprite = this.physics.add.sprite(x, y, 'PetAtlas').setInteractive();
      pet.sprite.on('pointerdown', (pointer) => {
        this.player.lastScene = 'MainScene';
        this.player.activePet = pet;
        this.scene.start('PetScene');
      });
      pet.sprite.setOrigin(0.5, 0.5);
      pet.sprite.setTint(this.player.pets[i].tint);
      pet.sprite.setScale(1.5);
      pet.sprite.play('walkLeft');
      this.move(pet);
    }
  }

  update() {
    for (var i = 0; i < this.player.pets.length; i++) {
      let pet = this.player.pets[i];
      pet.light.setPosition(pet.sprite.x, pet.sprite.y);
      if (pet.sprite.body.speed > 0) {
        let distance = Phaser.Math.Distance.Between(pet.sprite.x, pet.sprite.y, pet.target.x, pet.target.y);
        if (distance < 4) {
          this.player.pets[i].sprite.body.reset(pet.target.x, pet.target.y);
          this.move(pet);
        }
      }
    }
  }

  move(pet) {
    console.log('moving');
    pet.target.x = Phaser.Math.Between(100, 700);
    pet.target.y = Phaser.Math.Between(100, 1100);
    pet.timedEvent = this.time.addEvent({
      delay: Phaser.Math.Between(2000, 5000),
      callback: function() {
        this.physics.moveTo(pet.sprite, pet.target.x, pet.target.y, 50)
        if (pet.target.x > pet.sprite.x) {
          if (!pet.sprite.flipX) {
            pet.sprite.setFlip(true);
          }
        } else {
          pet.sprite.setFlip(false);
        }
      },
      callbackScope: this,
      loop: false
    });
  }
}
