class ShopScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'ShopScene'});
  }
  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var marketButton = this.physics.add.sprite(100, 1150, 'Signpost').setInteractive();
    marketButton.on('pointerdown', (pointer) => {
      this.scene.start('MarketPlaceScene');
    });

  }

  update() {}
}


for (var y = 0; y < this.map.length; y++) {
    let laneY = 256 * y;
    for (var x = 0; x < this.map[0].length; x++) {
        let laneX = 256 * x + 128;
        var tile;
        switch (this.map[y][x]) {
            case 1:
                tile = this.createTile(laneX, laneY, 256, 256, "GrassTile");
                break;
            case 2:
                tile = this.createTile(laneX, laneY, 256, 256, "GroundTile");
                this.groundTiles.add(tile);
                break;
            case 3:
                tile = this.createTile(laneX, laneY, 256, 256, "WaterTile");
                this.waterTiles.add(tile);
                break;
            case 4:
                tile = this.createTile(laneX, laneY, 256, 256, "ClimbingBottomTile");
                tile.body.setOffset(96, 0);
                this.climbingTilesg.add(tile);
                break;
            case 5:
                tile = this.createTile(laneX, laneY, 20, 256, "ClimbingMiddleTile");
                tile.body.setOffset(96, 0);
                this.climbingTilesg.add(tile);
                break;
            case 6:
                tile = this.createTile(laneX, laneY, 256, 20, "ClimbingTopTile");
                                tile.body.setOffset(96, 0);
                this.climbingTilesg.add(tile);
                break;
            case 7:
                tile = this.createTile(laneX, laneY, 256, 256, "ClimbingTopGroundTile");
                this.groundTiles.add(tile);
                break;
                case 8:
                    tile = this.createTile(laneX, laneY, 256, 20, "GrassTile");
                        tile.setVisible(false);
                                  tile.body.setOffset(50, 0);
                    this.airTiles.add(tile);
                    break;
                    case 9:
                        tile = this.createTile(laneX, laneY, 256, 20, "FinishTile");
                        this.finishTiles.add(tile);
                        break;
                        case 10:
                            tile = this.createTile(laneX, laneY, 256, 20, "FinishTile");
                            this.startTiles.add(tile);
                            break;
        }
    }
}
