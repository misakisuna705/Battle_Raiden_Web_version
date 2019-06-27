class Main_Scene extends Phaser.State {
  init() {
    const GAME = this.game;
    const ADD = GAME.add;
    const LOAD = GAME.load;

    ADD.image(-260, 0, "main_scene_bg");
    ADD.image(116, 30, "main_scene_title");

    this.loader = new Loader({ game: GAME, x: GAME.width / 2, y: (GAME.height / 8) * 7, text: "Loading ...   " + LOAD.progress });
  }

  preload() {
    const LOAD = this.game.load;

    LOAD.video("game_start_video", "assets/game_start/game start.mp4");
    LOAD.image("game_start_title", "assets/game_start/title.png");

    LOAD.image("play_scene_background", "assets/play_scene/ui/background.png");

    LOAD.image("player", "assets/play_scene/player/player.png");
    LOAD.image("player_bullet_0", "assets/play_scene/player/bullet_0.png");
    LOAD.image("player_bullet_1", "assets/play_scene/player/bullet_1.png");
    LOAD.image("player_bullet_2", "assets/play_scene/player/bullet_2.png");
    LOAD.spritesheet("player_explosion", "assets/play_scene/player/explosion.png", 128, 128);

    LOAD.image("enemy", "assets/play_scene/enemy/enemy.png");
    LOAD.image("enemy_bullet_1", "assets/play_scene/enemy/bullet.png");
    LOAD.image("enemy_explosion", "assets/play_scene/enemy/explosion.png");

    LOAD.image("boss", "assets/play_scene/boss/boss.png");
    LOAD.image("boss_bullet_1", "assets/play_scene/boss/bullet.png");

    LOAD.image("energy", "assets/play_scene/buffs/energy.png");

    LOAD.audio("play_scene_bgm", "assets/play_scene/future gazer.mp3");

    LOAD.image("pause_menu", "assets/play_scene/pause/board.png");
    LOAD.image("pause_select", "assets/play_scene/pause/select.png");
    LOAD.image("Yomikawa", "assets/play_scene/pause/Yomikawa.png");

    LOAD.video("video", "assets/game_end/game end.mp4");
  }

  update() {
    const GAME = this.game;

    if (GAME.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
      GAME.bgm.stop();

      GAME.state.start("Game_Start");
    }
  }
}
