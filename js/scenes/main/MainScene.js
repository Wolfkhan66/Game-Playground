class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'MainScene'});
  }

  preload() {

  }

  create() {
    const map = this.make.tilemap({ key: "map"});
    const tileset = map.addTilesetImage("Preview_1", "tiles");

 // Parameters: layer name (or index) from Tiled, tileset, x, y
 const belowLayer = map.createStaticLayer("groundlayer", tileset, 0, 0);
 belowLayer.setScale(0.5);
 const worldLayer = map.createStaticLayer("Objects", tileset, 0, 0);
 worldLayer.setScale(0.5);
    //this.scene.launch('UIScene');
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var trainingButton = this.add.sprite(100, 1150, 'Signpost').setInteractive();
    trainingButton.on('pointerdown', (pointer) => {
      this.scene.start('TrainingSelectScene');
    });
    var trainingIcon = this.add.sprite(105, 1150, 'TrainingIcon');
    trainingIcon.setScale(2);
    var arenaButton = this.add.sprite(924, 1150, 'Signpost').setInteractive();
    arenaButton.on('pointerdown', (pointer) => {
      this.scene.start('ArenaScene');
    });
    arenaButton.setFlip(true);
    var arenaIcon = this.add.sprite(924, 1150, 'ArenaIcon');
    arenaIcon.setScale(1.5);
    utility.createAnimations(this);

    var restButton = this.add.sprite(512, 100, 'Signpost').setInteractive();
    restButton.on('pointerdown', (pointer) => {
player.day++;
player.pets.forEach(function(pet){
  pet.age++;
})
    });
    for (var i = 0; i < player.pets.length; i++) {
      var x = Phaser.Math.Between(100, 700);
      var y = Phaser.Math.Between(100, 900);
      let pet = player.pets[i];
      console.log(pet);
pet.light = utility.addLight(this, x, y, pet.tint);
      pet.sprite = this.physics.add.sprite(x, y, 'Egg').setInteractive();
      if (pet.hatched){
        pet.chooseAnimation('idle');
      }

      pet.sprite.on('pointerdown', (pointer) => {
        player.lastScene = 'MainScene';
        player.activePet = pet;
        this.scene.start('PetScene');
      });
      pet.sprite.setOrigin(0.5, 0.5);
      pet.sprite.setTint(pet.tint);
      //pet.sprite.body.setSize(true);
      pet.reset();
    }


  }

  update() {
    for (var i = 0; i < player.pets.length; i++) {
      player.pets[i].update(this);
    }
  }
}
