class Pet {
  constructor() {
    this.sprite;
    this.id;
    this.raceFinished = false;
    var hsv = Phaser.Display.Color.HSVColorWheel();
    var colour = hsv[Phaser.Math.Between(0, 20) * 10].color;
    this.tint = colour;
    this.name = "pet" + Phaser.Math.Between(0, 100);
    this.light;
    this.moving = false;
    this.age = 1;
    this.wobbling = false;
    this.hatching = false;
    this.hatched = false;
    this.idleAnimations = [
      "thinking",
      "standDown",
      "standLeft",
      "standRight",
      "standUp",
      "sittingDown",
      "sittingLeft",
      "sittingRight",
      "wave"
    ];
    this.petSceneAnimations = [
      "thinking",
      "standDown",
      "content",
      "sittingDown",
      "wave"
    ];

    this.target = {
      x: 0,
      y: 0
    };
    this.timedEvent;
    this.skills = [
      {
        element: "Fire",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      },
      {
        element: "Earth",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      },
      {
        element: "Water",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      },
      {
        element: "Air",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      },
      {
        element: "Light",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      },
      {
        element: "Dark",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      },
      {
        element: "Special",
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }
    ];
  }


  update(scene) {
    this.sprite.setDepth(this.sprite.y);

    if (this.age > 4) {
      if (!this.hatched) {
        if (!this.hatching) {
          let pet = this;
          this.hatching = true;
              pet.sprite.setTexture('Hatching1');
          scene.time.addEvent({
            delay: 2000,
            callback: function() {
              pet.sprite.setTexture('Hatching2');
              scene.time.addEvent({
                delay: 2000,
                callback: function() {
  pet.sprite.setTexture('Hatching3');
                  scene.time.addEvent({
                    delay: 2000,
                    callback: function() {

                      pet.sprite.play("sittingDown");
                      pet.hatched = true;
                      pet.move(scene);
                    },
                    callbackScope: scene,
                    loop: false
                  });
                },
                callbackScope: scene,
                loop: false
              });
            },
            callbackScope: scene,
            loop: false
          });
        }
      } else {
        this.light.setPosition(this.sprite.x, this.sprite.y);
        this.sprite.setScale(1);
        if (this.sprite.body.speed == 0 && !this.moving) {
          this.move(scene);
          this.moving = true;
        } else {
          let distance = Phaser.Math.Distance.Between(
            this.sprite.x,
            this.sprite.y,
            this.target.x,
            this.target.y
          );
          if (distance < 4) {
            this.sprite.body.reset(this.target.x, this.target.y);
            this.moving = false;
            this.chooseAnimation("idle");
          }
        }
      }
    } else {
      this.sprite.setScale(0.5 +(0.15* this.age));
      if (!this.wobbling) {
        let pet = this;
        pet.wobbling = true;
        scene.time.addEvent({
          delay: 3000 - this.age * 500,
          callback: function() {
            pet.wobble(scene);
          },
          callbackScope: scene,
          loop: false
        });
      }
    }
  }

  wobble(scene) {
    let pet = this;

    scene.time.addEvent({
      delay: 50,
      callback: function() {
        pet.sprite.angle += 10;

        scene.time.addEvent({
          delay: 50,
          callback: function() {
            pet.sprite.angle -= 10;

            scene.time.addEvent({
              delay: 50,
              callback: function() {
                pet.sprite.angle -= 10;

                scene.time.addEvent({
                  delay: 50,
                  callback: function() {
                    pet.sprite.angle += 10;
                    pet.wobbling = false;
                  },
                  callbackScope: scene,
                  loop: false
                });
              },
              callbackScope: scene,
              loop: false
            });
          },
          callbackScope: scene,
          loop: false
        });
      },
      callbackScope: scene,
      loop: false
    });
  }

  reset() {
    this.moving = false;
  }

  move(scene) {
    console.log("moving");
    let pet = this;
    pet.target.x = Phaser.Math.Between(100, 700);
    pet.target.y = Phaser.Math.Between(100, 1100);
    pet.timedEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(0, 30000),
      callback: function() {
        this.physics.moveTo(pet.sprite, pet.target.x, pet.target.y, 50);
        pet.sprite.play("walkLeft");
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

  chooseAnimation(group) {
    var animation;
    switch (group) {
      case "idle":
        animation = this.idleAnimations[Phaser.Math.Between(0, 6)];
        break;
      case "petScene":
        animation = this.petSceneAnimations[Phaser.Math.Between(0, 4)];
        break;
      default:
    }

    this.sprite.play(animation);
    if (animation == "standRight" || animation == "sittingRight") {
      this.sprite.setFlip(true);
    } else {
      this.sprite.setFlip(false);
    }
  }
}
