class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: "ResultsScene" });
  }

  preload() {}

  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: 100,
      y: 100,
      text: "Results Scene",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    var resultsText;
    switch (player.currentEvent) {
      case "TrainingScene":
        switch (player.training) {
          case "Air":
            resultsText = ["Air Experience: " + "1"];
            loadingText.text = resultsText;
            break;
          case "Fire":
            resultsText = ["Fire Experience: " + "1"];
            loadingText.text = resultsText;
            break;
          case "Water":
            resultsText = ["Water Experience: " + "1"];
            loadingText.text = resultsText;
            break;
          case "Earth":
            resultsText = ["Earth Experience: " + "1"];
            loadingText.text = resultsText;
            break;
        }
        break;
      case "RacingScene":
        resultsText = ["Currency: " + "1", "Position: 1st"];
        for (var i = 0; i < 3; i++) {
          player.raceFinishPositions[i].sprite = this.physics.add.sprite(
            200 * (i + 1),
            500 + i * 100,
            "PetAtlas"
          );
          player.raceFinishPositions[i].sprite.setOrigin(0.5, 0.5);
          player.raceFinishPositions[i].sprite.setTint(
            player.raceFinishPositions[i].tint
          );
          player.raceFinishPositions[i].sprite.play("celebrate");
          var PositionText = this.make.text({
            x: 200 * (i + 1) - 25,
            y: 300 + i * 100,
            text: i + 1,
            style: {
              font: "100px monospace",
              fill: "#ffffff"
            }
          });
        }
        loadingText.text = resultsText;

        break;
      case "FightingScene":
        resultsText = ["Currency: " + "1", "Position: 1st"];
        loadingText.text = resultsText;
        break;
      default:
    }

    this.continueButton = utility.createTextButton(
      this,
      150,
      1150,
      500,
      "Continue"
    );
    this.continueButton.getChildren()[2].on("pointerdown", pointer => {
      player.activePet.skills.forEach(function(skill) {
        if (skill.element == "Air") {
          skill.level++;
        }
      });
      this.scene.start(player.lastScene);
    });
  }

  update() {}
}
