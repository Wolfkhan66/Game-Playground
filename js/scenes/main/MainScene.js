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
    utility.createAnimations(this);
    var path = new Phaser.Curves.Line([100, 100, 500, 200]);
    for (var i = 0; i < this.player.pets.length; i++) {
      var x = Phaser.Math.Between(100, 700);
      var y = Phaser.Math.Between(100, 1100);
      let pet = this.player.pets[i];
      pet.light = utility.addLight(this, x, y, pet.tint);
      pet.sprite = this.physics.add.sprite(x, y, 'PetAtlas').setInteractive();
      pet.sprite.on('pointerdown', (pointer) => {
        this.player.lastScene = 'MainScene';
        this.player.activePet = pet;
        this.scene.start('PetScene');
      });
      pet.sprite.setOrigin(0.5, 0.5);
      pet.sprite.setTint(pet.tint);
      pet.sprite.setScale(1);
      pet.sprite.play('walkLeft');
      pet.move(this);
    }
  }

  update() {
    for (var i = 0; i < this.player.pets.length; i++) {
      this.player.pets[i].update(this);
    }
  }
}
