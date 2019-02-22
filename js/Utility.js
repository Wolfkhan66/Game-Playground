class Utility {
  constructor() {}

  createButton(scene, x, y, width, image) {
    var group = scene.add.group();
    var sprite = scene.add.sprite(x + (width / 2), y + (100 / 2), image);
    var hitArea = scene.add.rectangle(x, y, width, 100).setInteractive();
    hitArea.setOrigin(0, 0)
    var button = scene.add.graphics();
    button.fillStyle(0xffffff, 0.2);
    button.fillRoundedRect(x, y, width, 100, 16);
    group.add(sprite);
    group.add(button);
    group.add(hitArea);
    return group;
  }
}
