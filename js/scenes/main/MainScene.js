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
    var path = new Phaser.Curves.Line([100, 100, 500, 200]);
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
      this.move(pet);
    }
  }

  update() {
    for (var i = 0; i < this.player.pets.length; i++) {
      if (this.player.pets[i].sprite.body.speed > 0) {
        let distance = Phaser.Math.Distance.Between(this.player.pets[i].sprite.x, this.player.pets[i].sprite.y, this.player.pets[i].target.x, this.player.pets[i].target.y);
        if (distance < 4) {
          this.player.pets[i].sprite.body.reset(this.player.pets[i].target.x, this.player.pets[i].target.y);
          this.move(this.player.pets[i]);
        }
      }
    }
  }

  move(pet) {
    console.log('moving');
    pet.target.x = Phaser.Math.Between(100, 700);
    pet.target.y = Phaser.Math.Between(100, 1100);
    pet.timedEvent = this.time.addEvent({
      delay: Phaser.Math.Between(2000, 5000),
      callback: function() {
        this.physics.moveTo(pet.sprite, pet.target.x, pet.target.y, 50)
      },
      callbackScope: this,
      loop: false
    });
  }
}
