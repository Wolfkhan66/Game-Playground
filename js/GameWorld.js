class GameWorld {
  constructor() {
    console.log("Constructing Game World");
    // Here we are enabling the Phaser physics system, The arcade mode is what you typically see in topdown or sidescrolling games
    // With this enabled we can make use of phasers collisions methods to detect for an overlap or even apply gravity to a sprite
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.assets = [];

    for (var y = 0; y < 24; y++) {
      for (var x = 0; x < 40; x++) {
        this.createAsset('Tile', x * 32, y * 32)
      }
    }

    for (var i = 0; i < 15; i++) {
      this.createAsset("Rock", 0, 0);
    }

    this.player = new Player();
  }

  update() {
    this.checkCollisions();
    this.player.update();
  }

  checkCollisions() {
    this.assets.forEach(function(asset) {
      switch (asset.Type) {
        case "Rock":
          game.physics.arcade.collide(gameWorld.player.sprite, asset.Sprite);
          break;
        case "Tile":
          game.physics.arcade.overlap(gameWorld.player.sprite, asset.Sprite)
            ? gameWorld.tileCollision(gameWorld.player.sprite, asset.Sprite)
            : gameWorld.resetTile(gameWorld.player.sprite, asset.Sprite);
          break;
      }
    });
  }

  tileCollision(playerSprite, tileSprite) {
    console.log("tile collision");
    tileSprite.loadTexture('Tile2');
  }

  resetTile(playerSprite, tileSprite) {
    tileSprite.loadTexture('Tile');
  }

  cleanUp() {
    this.assets.forEach(asset => asset.Sprite.destroy());
    this.assets = [];
    this.player.reset();
  }

  createAsset(type, x, y) {
    var sprite;
    switch (type) {
      case "Rock":
        sprite = game.add.sprite(x, y, type, type + '.png');
        sprite.x = game.rnd.integerInRange(10, 1270);
        sprite.y = game.rnd.integerInRange(10, 758);
        break;
      case "Tile":
        sprite = game.add.sprite(x, y, type, type + '.png');
        break;
      default:
    }
    game.physics.arcade.enable(sprite);
    sprite.enableBody = true;
    sprite.body.immovable = true;

    this.assets.push({Sprite: sprite, Type: type});
  }
}
