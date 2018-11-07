class Player {
  constructor() {
    console.log("Constructing Player");
    this.sprite = game.add.sprite(125, 275, 'Player', 'Player.png');
    // Here we are enabling the Phaser physics engine on the sprite to allow us to do things such as check for collisions or apply velocity.
    game.physics.arcade.enable(this.sprite);
    this.sprite.enableBody = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.velocity = 100;
    this.gravity = 15;
    this.keys = [
      {
        cursor: this.cursors.left,
        action: () => {
          gameWorld.player.sprite.body.velocity.x = -gameWorld.player.velocity;
        }
      }, {
        cursor: this.cursors.right,
        action: () => {
          gameWorld.player.sprite.body.velocity.x = gameWorld.player.velocity;
        }
      }, {
        cursor: this.cursors.up,
        action: () => {
          gameWorld.player.sprite.body.velocity.y = -gameWorld.player.velocity;
        }
      }, {
        cursor: this.cursors.down,
        action: () => {
          gameWorld.player.sprite.body.velocity.y = gameWorld.player.velocity;
        }
      }, {
        cursor: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        action: () => {
          gameWorld.player.action();
        }
      }
    ];
  }

  update() {
    this.detectMovement();
  }

  action() {
    console.log("Space key pressed");
  }

  detectMovement() {
    // Listen for keypresses to move the player sprite
    // To be able to access the sprite properties within the foreach loop we need to declare it locally inside the function
    var sprite = this.sprite;
    var gravity = this.gravity;
    this.keys.forEach(function(key) {
      if (key.cursor.isDown) {
        key.action();
      } else {
        sprite.body.velocity.x -= sprite.body.velocity.x / gravity;
        sprite.body.velocity.y -= sprite.body.velocity.y / gravity;
      }
    });
  }
}
