class Player_Explosion_1 extends Phaser.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    this.createMultiple(5, "player_explosion");
    this.setAll("anchor.x", 0.5);
    this.setAll("anchor.y", 0.5);

    this.forEach(explosion => {
      explosion.animations.add("player_explosion");
    }, this);
  }
}
