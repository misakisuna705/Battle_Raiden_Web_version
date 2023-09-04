class Boss extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    const GAME = this.game;

    GAME.physics.arcade.enable(this);

    this.checkWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);
    this.exists = false;

    this.weapon = new Boss_Weapon_1({ game: GAME, parent: this });

    this.game.add.existing(this);

    this.loop();
  }

  loop() {
    const GAME = this.game;
    const RANDOM = GAME.rnd;

    GAME.time.events.loop(
      2000,
      () => {
        if (this.exists) {
          GAME.add
            .tween(this)
            .to({ x: RANDOM.integerInRange(0, GAME.width), y: RANDOM.integerInRange(0, GAME.height / 4) }, 1750, Phaser.Easing.Quartic.InOut, true);
        }
      },
      this
    );
  }

  check(timer) {
    if (timer.counter === 30) {
      this.reset(this.x, this.y, 100);
    }
  }

  move(player) {
    if (this.exists) {
      this.rotation = this.game.physics.arcade.angleBetween(this, player);
    }
  }

  shoot(player) {
    if (this.exists) {
      const NOW = this.game.time.now;
      const WEAPON = this.weapon;

      if (WEAPON.mark < NOW) {
        for (let i = -1; i <= 1; i++) {
          WEAPON.fireAtXY(player.x + 100 * i, player.y + 100 * i);
        }

        WEAPON.mark = NOW + WEAPON.delay;
      }
    }
  }

  hurt(player) {
    if (this.exists) {
      this.game.physics.arcade.overlap(this, player.weapon.bullets, (boss, bullet) => {
        bullet.kill();
        boss.damage(1);
      });
    }
  }

  die(bgm) {
    if (!this.health) {
      bgm.stop();
      this.game.state.start("Game_End");
    }
  }
}
