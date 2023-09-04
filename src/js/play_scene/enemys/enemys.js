class Enemys extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    const GAME = this.game;

    this.createMultiple(3, "enemy");
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 0.5);
    this.setAll("checkWorldBounds", true);
    this.setAll("outOfBoundsKill", true);

    this.weapon = new Enemy_Weapon_1({ game: GAME });
    this.forEach(enemy => {
      enemy.explosion = new Enemys_Explosion_1({ game: GAME, x: 0, y: 0 });
    }, this);

    this.loop();
  }

  loop() {
    const GAME = this.game;

    GAME.time.events.loop(
      1000,
      () => {
        this.forEachExists(enemy => {
          GAME.add.tween(enemy).to({ x: GAME.rnd.integerInRange(0, 480) }, 1750, Phaser.Easing.Quadratic.InOut, true);
        }, this);
      },
      this
    );
  }

  check(timer) {
    if (timer.counter < 30) {
      const ENEMY = this.getFirstExists(false);
      const RND = this.game.rnd;

      if (ENEMY) {
        ENEMY.reset(RND.integerInRange(0, 480), 0, 3);
        ENEMY.body.velocity.y = RND.integerInRange(100, 200);
      }
    }
  }

  move(player) {
    this.forEachExists(enemy => {
      enemy.rotation = this.game.physics.arcade.angleBetween(enemy, player);
    }, this);
  }

  shoot(player) {
    const ENEMY = this.getRandomExists(0, 2);
    const WEAPON = this.weapon;

    if (ENEMY) {
      WEAPON.trackSprite(ENEMY, 0, 0, false);
      WEAPON.fireAtSprite(player);
    }
  }

  hurt(player, energys) {
    this.forEachExists(enemy => {
      this.game.physics.arcade.overlap(enemy, player.weapon.bullets, (enemy, bullet) => {
        bullet.kill();
        enemy.damage(1);
      });
    }, this);
  }

  die(energys) {
    const energy = energys.getFirstExists(false);
    this.forEach(enemy => {
      if (!enemy.health) {
        const X = enemy.x;
        const Y = enemy.y;

        if (Y > 50) {
          if (energy) {
            energy.reset(X, Y);
          }
        }

        enemy.explosion.x = X;
        enemy.explosion.y = Y;

        enemy.explosion.start(true, 2000, null, 50);
      }
    }, this);
  }
}
