var utility = new Utility();
var game = new Phaser.Game({
  type: Phaser.WEBGL,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 1280
  },
  backgroundColor: '#4488AA',
  scene: [
    LoadingScene,
    TitleScene,
    MainScene,
    ResultsScene,
    UIScene,
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
    RacingScene,
    RaceSelectScene,
    RaceLevelSelectScene
  ],
  physics: {
    default: 'arcade'
  }
});
