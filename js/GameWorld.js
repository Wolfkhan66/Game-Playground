class GameWorld {
  constructor() {
    console.log("Constructing Game World");
    // Here we are enabling the Phaser physics system, The arcade mode is what you typically see in topdown or sidescrolling games
    // With this enabled we can make use of phasers collisions methods to detect for an overlap or even apply gravity to a sprite
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.assets = [];
    this.player = new Player();

    for (var i = 0; i < 15; i++) {
      this.createAsset("Rock");
    }
  }

  update() {
    this.checkCollisions();
    this.player.update();
  }

  checkCollisions() {
    this.assets.forEach(function(asset) {
      switch (asset.Type) {
        case "Rock":
          game.physics.arcade.overlap(gameWorld.player.sprite, asset.Sprite, gameWorld.rockCollision);
          break;
      }
    });
  }

  rockCollision(playerSprite, rockSprite) {
    // Do something because we collided
    console.log("Ouch a rock!");
  }

  cleanUp() {
    this.assets.forEach(asset => asset.Sprite.destroy());
    this.assets = [];
    this.player.reset();
  }

  createAsset(type) {
    var sprite;
    switch (type) {
      case "Rock":
        sprite = game.add.sprite(0, 0, 'Rock', 'Rock.png');
        sprite.x = game.rnd.integerInRange(10, 1270);
        sprite.y = game.rnd.integerInRange(10, 758);
        break;
      default:
    }
    game.physics.arcade.enable(sprite);
    sprite.enableBody = true;

    this.assets.push({Sprite: sprite, Type: type});
  }
}
