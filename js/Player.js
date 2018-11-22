class Player {
  constructor() {
    console.log("Constructing Player");
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'Player', 'Player.png');
    // Here we are enabling the Phaser physics engine on the sprite to allow us to do things such as check for collisions or apply velocity.
    game.physics.arcade.enable(this.sprite);
    this.sprite.enableBody = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.velocity = 100;
    this.gravity = 15;
    this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.actionKey.onDown.add(this.action, this);
    this.sprite.facingDirection;
    this.keys = [
      {
        cursor: this.cursors.left,
        action: () => {
          gameWorld.player.sprite.body.velocity.x = -gameWorld.player.velocity;
        },
        direction: "left"
      }, {
        cursor: this.cursors.right,
        action: () => {
          gameWorld.player.sprite.body.velocity.x = gameWorld.player.velocity;
        },
        direction: "right"
      }, {
        cursor: this.cursors.up,
        action: () => {
          gameWorld.player.sprite.body.velocity.y = -gameWorld.player.velocity;
        },
        direction: "up"
      }, {
        cursor: this.cursors.down,
        action: () => {
          gameWorld.player.sprite.body.velocity.y = gameWorld.player.velocity;
        },
        direction: "down"
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
    var player = this;
    this.keys.forEach(function(key) {
      if (key.cursor.isDown) {
        key.action();
        player.sprite.direction = key.direction;
      } else {
        player.sprite.body.velocity.x -= player.sprite.body.velocity.x / player.gravity;
        player.sprite.body.velocity.y -= player.sprite.body.velocity.y / player.gravity;
      }
    });
  }
}
