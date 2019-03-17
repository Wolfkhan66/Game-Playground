var utility = new Utility();
var player = new Player();
var game = new Phaser.Game({
  type: Phaser.WEBGL,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1024,
    height: 1280
  },
  backgroundColor: '#8cc656',
  scene: [
    LoadingScene,
    TitleScene,
    MainScene,
    ResultsScene,
    UIScene,
    ArenaScene,
    TrainingSelectScene,
    TrainingScene,
    PetScene,
    ShopScene,
    MarketPlaceScene,
    FightingScene,
    RacingScene,
    RaceSelectScene,
    RaceLevelSelectScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
    debug: false
}
  }
});
