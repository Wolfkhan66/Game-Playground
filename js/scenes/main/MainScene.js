class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'MainScene'});
  }

  preload() {}

  create() {
    this.scene.launch('UIScene');
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var trainingButton = utility.createTextButton(this, 25, 1150, 350, 'Training');
    trainingButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('TrainingScene');
    });
    var arenaButton = utility.createTextButton(this, 425, 1150, 350, 'Arena');
    arenaButton.getChildren()[2].on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });

    this.player = this.registry.get('player');

    for (var i = 0; i < this.player.pets.length; i++) {
      let pet = this.player.pets[i];
      pet.sprite = this.physics.add.sprite(384, 800 - (i * -60), 'Pet').setInteractive();
      pet.sprite.on('pointerdown', (pointer) => {
        this.player.lastScene = 'MainScene';
        this.player.activePet = pet;
        this.scene.start('PetScene');
      });
      pet.sprite.setOrigin(0.5, 0.5);
      pet.sprite.setTint(this.player.pets[i].tint);
    }

  }

  update() {}
}
