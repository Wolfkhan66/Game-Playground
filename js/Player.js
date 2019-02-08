class Player {
    constructor(game) {
        console.log("Constructing Player");
        this.sprite = game.physics.add.sprite(200, 200, 'Player');
        this.sprite.setDrag(250);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.velocity = 100;
        this.sprite;
        this.facingDirection = "";
        this.keys = [
            {
                cursor: this.cursors.left,
                action: () => {
                    this.sprite.setVelocityX(-this.velocity);
                },
                direction: "left"
            }, {
                cursor: this.cursors.right,
                action: () => {

                    this.sprite.setVelocityX(this.velocity);
                },
                direction: "right"
            }, {
                cursor: this.cursors.up,
                action: () => {
                    this.sprite.setVelocityY(-this.velocity);
                },
                direction: "up"
            }, {
                cursor: this.cursors.down,
                action: () => {
                    this.sprite.setVelocityY(this.velocity);
                },
                direction: "down"
            }
        ];
    }

    update() {
        this.detectMovement();
    }

    detectMovement() {
        var player = this;
        this.keys.forEach(function (key) {
            if (key.cursor.isDown) {
                player.facingDirection = key.direction;
                key.action();
            }
        });
    }
}
