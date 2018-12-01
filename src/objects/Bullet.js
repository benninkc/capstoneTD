import 'phaser';

export default class Bullet extends Phaser.GameObjects.Image {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');

		this.scene = scene;
		this.dx = 0;
		this.dy = 0;
		this.lifespan = 0;
		this.speed = Phaser.Math.GetSpeed(600, 1);
		this.tType = 0;

		//add the bullet to game
		this.scene.add.existing(this);
	}

	update(time, delta) {
		this.lifespan -= delta;

		this.x += this.dx * (this.speed * delta);
		this.y += this.dy * (this.speed * delta);

		if (this.lifespan <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}

	fire(x, y, angle, tType) {
		this.setActive(true);
		this.setVisible(true);
		this.tType = tType;
		// update position of bullet
		this.setPosition(x, y);

		this.dx = Math.cos(angle);
		this.dy = Math.sin(angle);

		this.lifespan = 300;
	}
}