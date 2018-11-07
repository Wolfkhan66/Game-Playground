function main() {
  console.log("main();");

  // This is essentially our base game resolution
  const GAMEWIDTH = 1280;
  const GAMEHEIGHT = 768;

  // Initialize the phaser game window, give it a width of GAMEWIDTH and a height of GAMEHEIGHT, set the rendering context to auto and attach the window to a div with the ID "GameWindow"
  game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'GameWindow', {
    preload: preload,
    create: create,
    update: update
  });
}

function preload() {
  console.log("Loading Assets...");
  // Here we preload game assets such as images, audio, tilemaps and spritesheets \\
  game.stage.backgroundColor = "#4488AA";
  game.load.image('Player', 'assets/Player.png');
  game.load.image('Rock', 'assets/Rock.png');
  console.log("Assets Loaded.");
}

function create() {
  console.log("Creating World...");
  // Here is where instatiate our classes and objects before starting the game loop, such as a camera or the game world or a UI class \\
  gameWorld = new GameWorld();
  console.log("Creation complete.");
}

function update() {
  // Here begins the game loop, typically here you would call any updates for objects such as telling the game camera or the game world to update
  gameWorld.update();
}
