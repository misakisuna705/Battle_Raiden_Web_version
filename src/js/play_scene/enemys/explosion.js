class Enemys_Explosion_1 extends Phaser.Particles.Arcade.Emitter {
  constructor({ game, x, y, maxParticles }) {
    super(game, x, y, maxParticles);

    this.makeParticles("enemy_explosion");
    this.gravity = 500;
  }
}
