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

    var player = new Player(this);
    utility.scene = this;
    utility.plyaer = player;
    this.registry.set('player', player);
    this.load.image('Tile1', 'assets/images/Tile1.png');
    this.load.image('Tile2', 'assets/images/Tile2.png');
    this.load.image('Ball', 'assets/images/Ball.png');
    this.load.image('Button', 'assets/images/Button.png');
    this.load.image('Particle', 'assets/images/Particle.png');
    this.load.image('ArenaIcon', 'assets/images/ArenaIcon.png');
    this.load.image('TrainingIcon', 'assets/images/TrainingIcon.png');
    this.load.image('ShopIcon', 'assets/images/ShopIcon.png');
    this.load.image('Grass', 'assets/images/Grass1.png');
    this.load.image('Signpost', 'assets/images/Signpost2.png');
    this.load.atlas('PetAtlas', 'assets/images/PetAtlas.png', 'assets/images/PetAtlas.json');
    for (var i = 0; i < 2; i++) {
      this.load.image('Test' + i, 'assets/images/test.jpg');
    }
  }
}
