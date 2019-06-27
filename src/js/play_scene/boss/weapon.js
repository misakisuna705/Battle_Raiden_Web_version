class Boss_Weapon_1 extends Phaser.Weapon {
  constructor({ game, parent }) {
    super(game, parent);

    this.multiFire = true;
    this.bulletSpeed = 100;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    this.trackSprite(this.parent, 120, 0, true);
    this.createBullets(100, "boss_bullet_1", 1);

    this.mark = 0;
    this.delay = 1000;
  }
}
