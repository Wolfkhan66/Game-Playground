class Player {
  constructor(scene) {
    this.currency = 100;
    this.day = 1;
    this.pets = [];
    this.scene = scene;
    this.elements = [];
    this.activePet;
    for (var i = 0; i < 4; i++) {
      this.pets.push(new Pet(scene));
    }
  }

  destroyElements() {
    this.elements.forEach(function(element) {
      element.Object.destroy();
    })
    this.elements = [];
  }

  addElement(id, type, object) {
    if (this.elements.some((element) => {
      return element.Id == id;
    })) {
      this.elements.forEach(function(element) {
        if (element.Id == id) {
          element.Object.destroy();
          element.Object = object;
          element.Type = type;
        }
      })
    } else {
      this.elements.push({Id: id, Type: type, Object: object});
    }
    console.log(this.elements);
  }
}
