class mainScene {
  preload() {
    console.log("Loading Assets...");
    // Here we preload game assets such as images, audio, tilemaps and spritesheets \\
    this.backgroundColor = "#4488AA";
    this.load.image('Player', 'assets/Player.png');
    this.load.image('Rock', 'assets/Rock.png');
    this.load.image('Tile', 'assets/Tile.png');
    this.load.image('Tile2', 'assets/Tile2.png');
    this.load.image('Tile3', 'assets/Tile3.png');
    console.log("Assets Loaded.");
  }

  create() {
    console.log("Creating World...");
    this.tiles = this.physics.add.group();
    for (var y = 0; y < 24; y++) {
      for (var x = 0; x < 40; x++) {
        this.tiles.create(x * 32, y * 32, 'Tile')
      }
    }

    this.rocks = this.physics.add.group({key: 'Rock', frameQuantity: 30, immovable: true});

    Phaser.Actions.PlaceOnRectangle(this.rocks.getChildren(), new Phaser.Geom.Rectangle(84, 84, 616, 416));

    this.player = new Player(this);
    console.log("Creation complete.");
    // this.score = 0;
    //let style = { font: '20px Arial', fill: '#fff' };
    //this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

    //this.arrow = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update();
    this.physics.world.collide(this.player.sprite, this.rocks);
  }

  //hit() {
  //    this.coin.x = Phaser.Math.Between(100, 600);
  //    this.coin.y = Phaser.Math.Between(100, 200);

  //    this.score += 10;
  //    this.scoreText.setText('score: ' + this.score);

  //    this.tweens.add({
  //        targets: this.player,
  //        duration: 200,
  //        scaleX: 1.2,
  //        scaleY: 1.2,
  //        yoyo: true,
  //    });
  //}

}