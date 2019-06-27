class Player_Weapon_0 extends Phaser.Weapon {
  constructor({ game, parent }) {
    super(game, parent);

    this.bulletSpeed = 300;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.fireRate = 200;

    this.trackSprite(this.parent, 0, 0, false);
    this.createBullets(10, "player_bullet_0", 1);
  }
}

class Player_Weapon_1 extends Phaser.Weapon {
  constructor({ game, parent }) {
    super(game, parent);

    this.bulletSpeed = 600;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bulletAngleVariance = 30;
    this.fireRate = 150;

    this.trackSprite(this.parent, 0, 0, false);
    this.createBullets(10, "player_bullet_1", 1);
  }
}

class Player_Weapon_2 extends Phaser.Weapon {
  constructor({ game, parent }) {
    super(game, parent);

    this.bulletSpeed = 900;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.multiFire = true;

    this.trackSprite(this.parent, 0, 0, false);
    this.createBullets(30, "player_bullet_2", 1);

    this.mark = 0;
    this.delay = 150;
  }
}
