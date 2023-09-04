class Game extends Phaser.Game {
  constructor({ width, height, renderer, parent, state, transparent, antialias, physicsConfig }) {
    super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

    const STATE = this.state;

    STATE.add("Game_Load", Game_Load);
    STATE.add("Main_Scene", Main_Scene);
    STATE.add("Game_Start", Game_Start);
    STATE.add("Play_Scene", Play_Scene);
    STATE.add("Game_End", Game_End);
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const GAME = new Game({ width: 480, height: 640 });

    GAME.state.start("Game_Load");
  },
  false
);
