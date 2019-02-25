class Pet {
  constructor() {
    this.sprite;
    this.tint = Phaser.Math.Between(0, 16777215);
    this.name = 'pet' + Phaser.Math.Between(0, 100);
    this.light;
    this.hatched = 0;
    this.target = {
      x: 0,
      y: 0
    }
    this.timedEvent;
    this.skills = [
      {
        element: 'Fire',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Earth',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Water',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Air',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Light',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Dark',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Special',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }
    ]
  }

  update(scene) {
    this.light.setPosition(this.sprite.x, this.sprite.y);
    if (this.sprite.body.speed > 0) {
      let distance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
      if (distance < 4) {
        this.sprite.body.reset(this.target.x, this.target.y);
        this.move(scene);
      }
    }
  }

  move(scene) {
    console.log('moving');
    let pet = this;
    pet.target.x = Phaser.Math.Between(100, 700);
    pet.target.y = Phaser.Math.Between(100, 1100);
    pet.timedEvent = scene.time.addEvent({
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
      callbackScope: scene,
      loop: false
    });
  }
}
