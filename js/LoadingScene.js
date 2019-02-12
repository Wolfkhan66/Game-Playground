class LoadingScene extends Phaser.Scene {
  constructor(test) {
    super({key: 'LoadingScene'});
  }

  preload() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var progressBar = this.add.graphics();

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, height / 2 - 190, width * value, 100);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.scene.start('TitleScene');
    });

    this.backgroundColor = "#4488AA";
    this.load.image('Player', 'assets/Player.png');
    this.load.image('Rock', 'assets/Rock.png');
    this.load.image('Tile', 'assets/Tile.png');
    this.load.image('Tile2', 'assets/Tile2.png');
    this.load.image('Tile3', 'assets/Tile3.png');
    for (var i = 0; i < 50; i++) {
      this.load.image('Test' + i, 'assets/test.jpg');
    }
  }
}
