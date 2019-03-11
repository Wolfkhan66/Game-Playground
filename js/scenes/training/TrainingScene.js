class TrainingScene extends Phaser.Scene {
  constructor() {
    super({key: 'TrainingScene'});
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.miniGameEnded = false;
    this.button = this.physics.add.sprite(400, 1100, 'Button');
    this.button.setOrigin(0.5, 0.5);
    this.balls = this.physics.add.group();
    for (var i = 0; i < 25; i++) {
      var ball = this.physics.add.sprite(Phaser.Math.Between(50, 750), Phaser.Math.Between(-70, -100) * i, 'Ball');
      this.balls.add(ball);
    }
    this.balls.setVelocityY(Phaser.Math.Between(100, 200));
    this.physics.add.overlap(this.button, this.balls, this.ballOverlap);
  }

  ballOverlap(button, ball) {
    ball.setInteractive();
    ball.on('pointerdown', (pointer) => {
      ball.destroy();
    })
  }

  update() {
    for (var i = 0; i < this.balls.getChildren().length; i++) {
      if (!this.physics.overlap(this.button, this.balls.getChildren()[i])) {
        this.balls.getChildren()[i].removeInteractive();
      }
      if (this.balls.getChildren()[i].y > 1280) {
        this.balls.getChildren()[i].destroy();
      }
    }

    if (this.balls.getChildren().length == 0 && !this.miniGameEnded) {
      this.miniGameEnded = true;
      this.continueButton = utility.createTextButton(this, 150, 1150, 500, 'Continue');
      this.continueButton.getChildren()[2].on('pointerdown', (pointer) => {
        player.activePet.skills.forEach(function(skill) {
          if (skill.element == player.training) {
            skill.level++;
          }
        })
        this.scene.start('ResultsScene');
      });
    }

  }

}
