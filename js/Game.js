var game = new Phaser.Game({
  type: Phaser.WEBGL,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 768,
    height: 1280
  },
  backgroundColor: '#3498db',
  scene: [
    LoadingScene,
    TitleScene,
    MainScene,
    ArenaScene,
    TrainingScene,
    PetScene,
    ShopScene,
    MarketPlaceScene,
    FireTrainingScene,
    WaterTrainingScene,
    EarthTrainingScene,
    AirTrainingScene,
    FightingScene,
    RacingScene
  ],
  physics: {
    default: 'arcade'
  }
});
