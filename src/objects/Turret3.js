import 'phaser';

export default class Turret extends Phaser.GameObjects.Image {
	constructor(scene, x, y, map) {
		super(scene, x, y, 'tower3');

		this.scene = scene;
		this.map = map;
		this.nextTic = 0;
		this.turretType = 3;

		//add the turret to game
		this.scene.add.existing(this);
		this.setScale(-0.8);
	}

	update(time, delta) {
		//time to shoot
		if (time > this.nextTic) {
			this.fire();
			this.nextTic = time + 500;
		}
	}

	place(i, j) {
		this.y = i * 64 + 32;
		this.x = j * 64 + 32;
		this.map[i][j] = 1;
	}

	fire() {
		var enemy = this.scene.getEnemy(this.x, this.y, 200);
		if (enemy) {
			var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
			this.scene.addBullet(this.x, this.y, angle, this.turretType);
			this.angle = (angle+ Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
		}
	}
}