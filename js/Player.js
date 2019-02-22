class Player {
  constructor(scene) {
    this.currency = 100;
    this.day = 1;
    this.pets = [];
    this.scene = scene;

    this.petSelect = false;
    this.lastScene;
    this.currentEvent;
    for (var i = 0; i < 4; i++) {
      this.pets.push(new Pet(scene));
    }
    this.activePet = this.pets[0];
  }
}
