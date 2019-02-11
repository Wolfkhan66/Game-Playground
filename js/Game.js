var game = new Phaser.Game({
  type: Phaser.WEBGL,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 768
  },
  backgroundColor: '#3498db',
  scene: [
    LoadingScene, MainScene
  ],
  physics: {
    default: 'arcade'
  }
});
