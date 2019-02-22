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

    this.activeRace;
    this.activeLevel;
    this.races = [
      {
        name: "Fire",
        levels: [
          {
            name: "1",
            complete: false
          }, {
            name: "2",
            complete: false
          }, {
            name: "3",
            complete: false
          }, {
            name: "4",
            complete: false
          }
        ]
      }, {
        name: "Earth",
        levels: [
          {
            name: "1",
            complete: false
          }, {
            name: "2",
            complete: false
          }, {
            name: "3",
            complete: false
          }, {
            name: "4",
            complete: false
          }
        ]
      }, {
        name: "Water",
        levels: [
          {
            name: "1",
            complete: false
          }, {
            name: "2",
            complete: false
          }, {
            name: "3",
            complete: false
          }, {
            name: "4",
            complete: false
          }
        ]
      }, {
        name: "Air",
        levels: [
          {
            name: "1",
            complete: false
          }, {
            name: "2",
            complete: false
          }, {
            name: "3",
            complete: false
          }, {
            name: "4",
            complete: false
          }
        ]
      }
    ];
  }
}
