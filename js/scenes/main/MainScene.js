class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'MainScene'});
  }

  preload() {}

  create() {
    this.scene.launch('UIScene');
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var trainingButton = this.add.sprite(100, 1150, 'Signpost').setInteractive();
    trainingButton.on('pointerdown', (pointer) => {
      this.scene.start('TrainingSelectScene');
    });
    var trainingIcon = this.add.sprite(105, 1150, 'TrainingIcon');
    trainingIcon.setScale(2);
    var arenaButton = this.add.sprite(700, 1150, 'Signpost').setInteractive();
    arenaButton.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
    arenaButton.setFlip(true);
    var arenaIcon = this.add.sprite(700, 1150, 'ArenaIcon');
    arenaIcon.setScale(1.5);
    utility.createAnimations(this);

    for (var i = 0; i < player.pets.length; i++) {
      var x = Phaser.Math.Between(100, 700);
      var y = Phaser.Math.Between(100, 900);
      let pet = player.pets[i];
      console.log(pet);
      pet.light = utility.addLight(this, x, y, pet.tint);
      pet.sprite = this.physics.add.sprite(x, y, 'Egg').setInteractive();
      pet.sprite.on('pointerdown', (pointer) => {
        player.lastScene = 'MainScene';
        player.activePet = pet;
        this.scene.start('PetScene');
      });
      pet.sprite.setOrigin(0.5, 0.5);
      pet.sprite.setTint(pet.tint);
      pet.sprite.body.setSize(true);
      pet.reset();
    }

    for (var i = 0; i < 20; i++) {
      var grass = this.physics.add.sprite(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 1280), 'Grass');
      grass.setDepth(grass.y - 17);
      grass.setScale(0.5)
    }
  }

  update() {
    for (var i = 0; i < player.pets.length; i++) {
      player.pets[i].update(this);
    }
  }
}
