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

  createTextButton(scene, x, y, width, text) {
    var group = scene.add.group();
    var text = scene.make.text({
      x: x + (width / 2),
      y: y + (100 / 2),
      text: text,
      style: {
        font: '75px monospace',
        fill: '#ffffff'
      }
    });
    text.setOrigin(0.5, 0.5);
    var hitArea = scene.add.rectangle(x, y, width, 100).setInteractive();
    hitArea.setOrigin(0, 0)
    var button = scene.add.graphics();
    button.fillStyle(0xffffff, 0.2);
    button.fillRoundedRect(x, y, width, 100, 16);
    group.add(text);
    group.add(button);
    group.add(hitArea);
    return group;
  }

  addLight(scene, x, y, tint) {
    var light = scene.add.particles('Particle').createEmitter({
      x: x,
      y: y,
      quantity: 5,
      gravityY: -30,
      scale: {
        start: 0.75,
        end: 0,
        ease: 'Linear'
      },
      tint: tint,
      speed: {
        min: -75,
        max: -75
      },
      alpha: {
        start: 0.1,
        end: 0,
        ease: 'Linear'
      },
      angle: {
        min: 0,
        max: 360
      }
    });
    return light;
  }

  getFrames(name, frameNames) {
    var frames = frameNames.filter(function(frame) {
      return frame.frame.includes(name);
    }).sort(function(a, b) {
      return a.frame.localeCompare(b.frame, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
    return frames;
  }

  createAnimations(scene) {
    var frameNames = scene.anims.generateFrameNames('PetAtlas');
    console.log(frameNames);
    scene.anims.create({
      key: 'walkLeft',
      frames: this.getFrames('WalkingLeft', frameNames),
      frameRate: 4,
      repeat: -1
    });
    scene.anims.create({
      key: 'walkDown',
      frames: this.getFrames('WalkingDown', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'walkUp',
      frames: this.getFrames('WalkingUp', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'swim',
      frames: this.getFrames('Swim', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'wave',
      frames: this.getFrames('Wave', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'thinking',
      frames: this.getFrames('Thinking', frameNames),
      frameRate: 3,
      repeat: -1
    });
    scene.anims.create({
      key: 'standDown',
      frames: this.getFrames('Standing/Down', frameNames),
      frameRate: 2,
      repeat: -1
    });
    scene.anims.create({
      key: 'standLeft',
      frames: this.getFrames('Standing/Left', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'standRight',
      frames: this.getFrames('Standing/Left', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'standUp',
      frames: this.getFrames('Standing/Up', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'sittingDown',
      frames: this.getFrames('Sitting/Down', frameNames),
      frameRate: 2,
      repeat: -1
    });
    scene.anims.create({
      key: 'sittingLeft',
      frames: this.getFrames('Sitting/Left', frameNames),
      frameRate: 2,
      repeat: -1
    });
    scene.anims.create({
      key: 'sittingRight',
      frames: this.getFrames('Sitting/Left', frameNames),
      frameRate: 2,
      repeat: -1
    });
    scene.anims.create({
      key: 'crying',
      frames: this.getFrames('Crying', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'content',
      frames: this.getFrames('Content', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'fly',
      frames: this.getFrames('Fly', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'climb',
      frames: this.getFrames('Climb', frameNames),
      frameRate: 5,
      repeat: -1
    });
    scene.anims.create({
      key: 'celebrate',
      frames: this.getFrames('Celebrate', frameNames),
      frameRate: 5,
      repeat: -1
    });
  }
}
