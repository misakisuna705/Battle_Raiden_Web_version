class Game_Load extends Phaser.State {
  preload() {
    const LOAD = this.game.load;

    LOAD.image("main_scene_bg", "assets/main_scene/background.png");
    LOAD.image("main_scene_title", "assets/main_scene/title.png");
    LOAD.audio("main_scene_bgm", "assets/main_scene/late in autumn.mp3");
  }

  create() {
    const GAME = this.game;
    const ADD = GAME.add;

    ADD.image(-260, 0, "main_scene_bg");
    ADD.image(116, 30, "main_scene_title");

    GAME.bgm = ADD.audio("main_scene_bgm", 0.5, true);

    this.loop();
  }

  loop() {
    this.game.bgm.play();
  }

  update() {
    this.game.state.start("Main_Scene");
  }
}
