class Play_Scene extends Phaser.State {
  create() {
    const GAME = this.game;
    const HEIGHT = GAME.height;
    const WIDTH = GAME.width;
    const ADD = this.add;
    const KEYBOARD = this.input.keyboard;
    const KEYCODE = Phaser.Keyboard;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.world.setBounds(-40, 0, 560, HEIGHT);

    this.background = new Play_Scene_Background({ game: GAME, key: "play_scene_background" });
    this.score = new Score({ game: GAME, x: WIDTH / 2, y: 20 });
    this.timer = new Timer({ game: GAME });

    this.enemys = new Enemys({ game: GAME, enableBody: true });
    this.energys = new Energys({ game: GAME, enableBody: true });
    this.player = new Player({ game: GAME, x: WIDTH / 2, y: (HEIGHT / 8) * 7, key: "player" });
    this.boss = new Boss({ game: GAME, x: WIDTH / 2, y: HEIGHT / 4, key: "boss" });

    this.bgm = ADD.audio("play_scene_bgm", 0.5, true);

    this.pause_board = new IMG({ game: GAME, x: WIDTH / 2, y: -20, key: "pause_menu" });
    this.pause_contents = [
      new Txt({ game: GAME, x: WIDTH / 2, y: 170, text: "遊戲說明" }),
      new Txt({ game: GAME, x: WIDTH / 2, y: 245, text: "重新開始" }),
      new Txt({ game: GAME, x: WIDTH / 2, y: 320, text: "回主畫面" })
    ];
    this.pause_select = new IMG({ game: GAME, x: WIDTH / 2, y: 130, key: "pause_select" });
    this.pause_yomikawa = new IMG({ game: GAME, x: 90, y: 70, key: "Yomikawa" });
    this.pause_helps = [
      new Txt({ game: GAME, x: WIDTH / 2, y: 170, text: "移動：方向鍵" }),
      new Txt({ game: GAME, x: WIDTH / 2, y: 245, text: "攻擊：Ｚ" }),
      new Txt({ game: GAME, x: WIDTH / 2, y: 320, text: "大絕：// todo" })
    ];

    this.UP = KEYBOARD.addKey(KEYCODE.UP);
    this.DOWN = KEYBOARD.addKey(KEYCODE.DOWN);
    this.SPACE = KEYBOARD.addKey(KEYCODE.SPACEBAR);
    this.ENTER = KEYBOARD.addKey(KEYCODE.ENTER);

    this.loop();
  }

  loop() {
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.bgm.play();
  }

  update() {
    const GAME = this.game;
    const TIMER = this.timer;
    const PLAYER = this.player;
    const ENEMYS = this.enemys;
    const BOSS = this.boss;
    const ENERGYS = this.energys;

    this.background.renew(TIMER);
    this.score.renew(ENEMYS, BOSS);

    PLAYER.check();
    PLAYER.move();
    PLAYER.shoot();
    PLAYER.hurt(ENEMYS, BOSS);
    PLAYER.die();
    PLAYER.buff(ENERGYS);

    ENEMYS.check(TIMER);
    ENEMYS.move(PLAYER);
    ENEMYS.shoot(PLAYER);
    ENEMYS.hurt(PLAYER);
    ENEMYS.die(ENERGYS);

    BOSS.check(TIMER);
    BOSS.move(PLAYER);
    BOSS.shoot(PLAYER);
    BOSS.hurt(PLAYER);
    BOSS.die(this.bgm);

    if (this.SPACE.justDown) {
      this.pause_board.visible = true;
      for (let i = 0; i < 3; i++) {
        this.pause_contents[i].visible = true;
      }
      this.pause_select.visible = true;
      this.pause_yomikawa.visible = true;

      GAME.paused = !GAME.paused;
    }
  }

  pauseUpdate() {
    const GAME = this.game;
    const KEYBOARD = GAME.input.keyboard;
    const KEYCODE = Phaser.Keyboard;
    const SELECT = this.pause_select;
    const CONTENTS = this.pause_contents;
    const HELPS = this.pause_helps;

    if (this.UP.justDown) {
      if (SELECT.y === 130) {
        SELECT.y = 280;
      } else {
        SELECT.y -= 75;
      }
    } else if (this.DOWN.justDown) {
      if (SELECT.y === 280) {
        SELECT.y = 130;
      } else {
        SELECT.y += 75;
      }
    }

    if (this.ENTER.justDown) {
      for (let i = 0; i < 3; i++) {
        CONTENTS[i].visible = !CONTENTS[i].visible;
        HELPS[i].visible = !HELPS[i].visible;
      }
    }

    if (this.SPACE.justDown) {
      this.pause_board.visible = false;
      for (let i = 0; i < 3; i++) {
        CONTENTS[i].visible = false;
        HELPS[i].visible = false;
      }
      this.pause_select.visible = false;
      this.pause_yomikawa.visible = false;

      GAME.paused = !GAME.paused;
    }
  }
}
