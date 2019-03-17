class LoadingScene extends Phaser.Scene {
  constructor(test) {
    super({ key: "LoadingScene" });
  }

  preload() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var progressBar = this.add.graphics();

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", value => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, height / 2 - 190, width * value, 100);
    });

    this.load.on("fileprogress", file => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.scene.start("TitleScene");
    });

    var player = new Player(this);
    utility.scene = this;
    utility.plyaer = player;
    this.registry.set("player", player);
    this.load.image("tiles", "assets/images/Preview_1.png");
    this.load.tilemapTiledJSON("map", "assets/tiledtest.json");
    this.load.image("Egg", "assets/images/Egg.png");
    this.load.image("Hatching1", "assets/images/Hatching1.png");
    this.load.image("Hatching2", "assets/images/Hatching2.png");
    this.load.image("Hatching3", "assets/images/Hatching3.png");
    this.load.image("GrassTile", "assets/images/GrassTile.png");
    this.load.image("GroundTile", "assets/images/GroundTile.png");
    this.load.image("FinishTile", "assets/images/FinishTile.png");
    this.load.image("ClimbingTopTile", "assets/images/ClimbingTopTile.png");
    this.load.image(
      "ClimbingTopGroundTile",
      "assets/images/ClimbingTopGroundTile.png"
    );
    this.load.image(
      "ClimbingMiddleTile",
      "assets/images/ClimbingMiddleTile.png"
    );
    this.load.image(
      "ClimbingBottomTile",
      "assets/images/ClimbingBottomTile.png"
    );
    this.load.image("WaterTile", "assets/images/WaterTile.png");
    this.load.image("Ball", "assets/images/Ball.png");
    this.load.image("Paralex1", "assets/images/Paralex1.png");
    this.load.image("Paralex2", "assets/images/Paralex2.png");
    this.load.image("Paralex3", "assets/images/Paralex3.png");
    this.load.image("Paralex4", "assets/images/Paralex4.png");
    this.load.image("Paralex5", "assets/images/Paralex5.png");
    this.load.image("Button", "assets/images/Button.png");
    this.load.image("Particle", "assets/images/Particle.png");
    this.load.image("ArenaIcon", "assets/images/ArenaIcon.png");
    this.load.image("TrainingIcon", "assets/images/TrainingIcon.png");
    this.load.image("ShopIcon", "assets/images/ShopIcon.png");
    this.load.image("Grass", "assets/images/Grass1.png");
    this.load.image("Signpost", "assets/images/Signpost2.png");
    this.load.atlas(
      "PetAtlas",
      "assets/images/PetAtlas.png",
      "assets/images/PetAtlas.json"
    );
  }
}
