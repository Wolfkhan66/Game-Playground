class Pet {
  constructor(scene) {
    var width = scene.cameras.main.width;

    this.sprite = scene.add.sprite(width / 2, 300, 'Player').setInteractive();
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setScale(4);

    this.name = 'hello';
    this.skills = [
      {
        element: 'Fire',
        experience: 50,
        level: 1
      }, {
        element: 'Earth',
        experience: 10,
        level: 5
      }, {
        element: 'Water',
        experience: 30,
        level: 10
      }, {
        element: 'Air',
        experience: 80,
        level: 100
      }, {
        element: 'Light',
        experience: 20,
        level: 60
      }, {
        element: 'Dark',
        experience: 40,
        level: 16
      }, {
        element: 'Special',
        experience: 60,
        level: 19
      }
    ]
  }

}
