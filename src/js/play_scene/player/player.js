class Player extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    const GAME = this.game;

    GAME.physics.arcade.enable(this);
    GAME.add.existing(this);

    this.speed = 300;
    this.body.collideWorldBounds = true;
    this.health = 5;
    this.anchor.setTo(0.5, 0.5);

    this.level = 0;
    this.power = 0;

    this.weapons = [
      new Player_Weapon_0({ game: game, parent: this }),
      new Player_Weapon_1({ game: game, parent: this }),
      new Player_Weapon_2({ game: game, parent: this })
    ];

    this.explosions = new Player_Explosion_1({ game: GAME, enableBody: true });
  }

  check() {
    this.weapon = this.weapons[this.level];
  }

  move() {
    const KEYBOARD = this.game.input.keyboard;
    const KEYCODE = Phaser.Keyboard;
    const SPEED = this.speed;
    const VELOCITY = this.body.velocity;

    if (KEYBOARD.isDown(KEYCODE.LEFT)) {
      VELOCITY.x = SPEED * -1;
    } else if (KEYBOARD.isDown(KEYCODE.RIGHT)) {
      VELOCITY.x = SPEED;
    } else {
      VELOCITY.x = 0;
    }

    if (KEYBOARD.isDown(KEYCODE.UP)) {
      VELOCITY.y = SPEED * -1;
    } else if (KEYBOARD.isDown(KEYCODE.DOWN)) {
      VELOCITY.y = SPEED;
    } else {
      VELOCITY.y = 0;
    }
  }

  shoot() {
    const GAME = this.game;
    const KEYBOARD = GAME.input.keyboard;
    const KEYCODE = Phaser.Keyboard;

    if (KEYBOARD.isDown(KEYCODE.Z)) {
      const WEAPON = this.weapon;

      if (this.level === 2) {
        const NOW = GAME.time.now;

        if (WEAPON.mark < NOW) {
          for (let i = -1; i <= 1; i++) {
            WEAPON.fireAtXY(this.x + i, this.y - 2);
          }

          WEAPON.mark = NOW + WEAPON.delay;
        }
      } else {
        WEAPON.fire();
      }
    }
  }

  hurt(enemys, boss) {
    this.game.physics.arcade.overlap(
      this,
      enemys.weapon.bullets,
      (player, bullet) => {
        player.damage(1);
        bullet.kill();
      },
      null,
      this
    );

    this.game.physics.arcade.overlap(
      this,
      boss.weapon.bullets,
      (player, bullet) => {
        player.damage(1);
        bullet.kill();
      },
      null,
      this
    );
  }

  die() {
    if (!this.alive) {
      const EXPLOSION = this.explosions.getFirstExists(false);

      EXPLOSION.reset(this.x, this.y);
      EXPLOSION.play("player_explosion", 60, false, true);

      this.power = 0;
      this.level = 0;
      this.reset((480 - 50) / 2, 640 - 72 - 50, 5);

      this.game.camera.shake(0.05, 200, true, Phaser.Camera.SHAKE_HORIZONTAL);
    }
  }

  buff(energys) {
    this.game.physics.arcade.overlap(
      this,
      energys,
      (player, energy) => {
        energy.kill();

        if (this.power < 9) {
          this.power++;
        }

        if (this.level < 2) {
          if (this.power === 3 || this.power === 6) {
            this.level++;
          }
        }
      },
      null,
      this
    );
  }
}
