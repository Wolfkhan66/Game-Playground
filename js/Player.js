class Player {
  constructor() {
    this.currency = 100;
    this.day = 1;
    this.pets = [];
    this.petSelect = false;
    this.lastScene;
    this.currentEvent;
    this.training;
    for (var i = 0; i < 10; i++) {
      var pet = new Pet();
      pet.id = i;
      this.pets.push(pet);
    }
    this.activePet = this.pets[0];
    this.racePets = [];
    this.raceFinishPositions = [];
    this.activeRace;
    this.activeLevel;
    this.races = [
      {
        name: "Fire",
        levels: [
          {
            name: "Lava Pool",
            complete: false
          },
          {
            name: "Lake of Fire",
            complete: false
          },
          {
            name: "Scolville Canyon",
            complete: false
          },
          {
            name: "Mount Despair",
            complete: false
          }
        ]
      },
      {
        name: "Earth",
        levels: [
          {
            name: "Faerie Glenn",
            complete: false
          },
          {
            name: "Forest of Souls",
            complete: false
          },
          {
            name: "Seedling Circle",
            complete: false
          },
          {
            name: "Magic Meadow",
            complete: false
          }
        ]
      },
      {
        name: "Water",
        levels: [
          {
            name: "Rock Pool",
            complete: false
          },
          {
            name: "Reviving River",
            complete: false
          },
          {
            name: "Spirit Rapids",
            complete: false
          },
          {
            name: "Mighty Ocean",
            complete: false
          }
        ]
      },
      {
        name: "Air",
        levels: [
          {
            name: "Breezy Hollow",
            complete: false
          },
          {
            name: "Windy Willows",
            complete: false
          },
          {
            name: "Gusty Gallows",
            complete: false
          },
          {
            name: "Enchanted Storm",
            complete: false
          }
        ]
      }
    ];
  }
}
