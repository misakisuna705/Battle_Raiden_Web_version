class Enemy_Weapon_1 extends Phaser.Weapon {
  constructor({ game, parent }) {
    super(game, parent);

    this.bulletSpeed = 300;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.fireRate = 700;

    this.createBullets(5, "enemy_bullet_1", 1);
  }
}
