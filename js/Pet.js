class Pet {
  constructor(scene) {
    var width = scene.cameras.main.width;

    this.sprite;
    this.tint = Phaser.Math.Between(0, 16777215);
    this.name = 'pet' + Phaser.Math.Between(0, 100);
    this.skills = [
      {
        element: 'Fire',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Earth',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Water',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Air',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Light',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Dark',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }, {
        element: 'Special',
        experience: Phaser.Math.Between(0, 100),
        level: Phaser.Math.Between(0, 100)
      }
    ]
  }

}
