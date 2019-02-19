class Player {
  constructor(scene) {
    this.currency = 100;
    this.day = 1;
    this.pets = [];
    this.scene = scene;
    this.activePet;
    for (var i = 0; i < 4; i++) {
      this.pets.push(new Pet(scene));
    }
  }
}
