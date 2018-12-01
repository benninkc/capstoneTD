import 'phaser';
import map from '../config/map';
import map2 from '../config/map2';
import Enemy from '../objects/Enemy.js';
import Enemy2 from '../objects/Enemy2.js';
import Enemy3 from '../objects/Enemy3.js';
import Turret from '../objects/Turret.js';
import Turret2 from '../objects/Turret2.js';
import Turret3 from '../objects/Turret3.js';
import Bullet from '../objects/Bullet.js';
import levelConfig from '../config/levelConfig.js';


export default class Level2Scene extends Phaser.Scene {
	constructor() {
		super({
            key: 'Level2'
        });
	}

	init() {
		this.map = map2.map(function (arr) {
			return arr.slice();
		});
		this.level = 4;
		this.nextEnemy = 0;
		this.score = 600;
		this.turretType = 1;
		this.enemyType = 2;
		this.baseHealth = levelConfig.initial.baseHealth;
		// this.availableTurrets = 6;
		this.roundStarted = false;
		this.remainingEnemies = levelConfig.initial.numOfEnemies + this.level;
		// this.remainingEnemies = remainingEnemies;
		this.events.emit('displayUI');
		this.events.emit('updateHealth', this.baseHealth);
		this.events.emit('updateScore', this.score);
		// this.events.emit('updateTurrets', this.availableTurrets);
		this.events.emit('updateEnemies', this.remainingEnemies);


		// grab a reference to UI scene
		this.uiScene = this.scene.get('UI2');
	}

	create() {
		this.events.emit('startRound', this.level);

		this.uiScene.events.on('roundReady', function() {
			this.roundStarted = true;
		}.bind(this));
		this.createMap();
		this.createPath();
		this.createCursor();
		this.createGroups();
		this.createTowerButtons();

	}

	update (time, delta) {
		// if time for next enemy yet
		if (time > this.nextEnemy && this.roundStarted && this.enemies.countActive(true) < this.remainingEnemies) {
			var enemy = this.enemies.getFirstDead();
			if (!enemy) {
				// enemy = new Enemy(this, 0, 0, this.path);
				// 
				if(this.enemyType === 1){
					enemy = new Enemy3(this, 0, 0, this.path);
					this.enemyType = 2;
				}
				else if(this.enemyType === 2){
					enemy = new Enemy(this, 0, 0, this.path);
					this.enemyType = 3;
				}
				else if(this.enemyType === 3 && this.level < 8){
					enemy = new Enemy2(this, 0, 0, this.path);
					this.enemyType = 1;
				}
				else{
					enemy = new Enemy3(this, 0, 0, this.path);
					this.enemyType = 2;
				}
				this.enemies.add(enemy);
			}

			if (enemy) {
				enemy.setActive(true);
				enemy.setVisible(true);

				//place enemy at start of path
				enemy.startOnPath(this.level);

				this.nextEnemy = time + 2000;
			}
		}
	}

	updateScore(score) {
		this.score += score;
		this.events.emit('updateScore', this.score);
	}

	updateHealth(health) {
		this.baseHealth -= health;
		this.events.emit('updateHealth', this.baseHealth);
		if (this.baseHealth <= 0) {
			this.events.emit('hideUI');
			this.scene.start('GameOver');
		}
	}

	increaseLevel() {
		if (this.level >= 10) { 
			this.events.emit('hideUI');
			//replace with win screen
			this.scene.start('GameWin');
		}
		else{
			this.roundStarted = false;
			this.level++;
			// this.updateTurrets(levelConfig.incremental.numOfTurrets);
			this.updateEnemies(levelConfig.initial.numOfEnemies + this.level * levelConfig.incremental.numOfEnemies);
			this.events.emit('startRound', this.level);
		}
	}

	startNewMap() {
		this.level = 0;
		// this.updateTurrets(levelConfig.initial.numOfTurrets);
		this.updateEnemies(levelConfig.initial.numOfEnemies);
		this.scene.start('Level2');

	}

	updateEnemies(numberOfEnemies) {
		this.remainingEnemies += numberOfEnemies;
		this.events.emit('updateEnemies', this.remainingEnemies);
		if(this.remainingEnemies <= 0) {
			this.increaseLevel();
		}
	}

	// updateTurrets(numberOfTurrets) {
	// 	this.availableTurrets += numberOfTurrets;
	// 	this.events.emit('updateTurrets', this.availableTurrets);
	// }

	createTowerButtons() {
		this.tower1Button = this.add.sprite(0,0, 'towerButton1').setInteractive();
		this.tower2Button = this.add.sprite(0,0, 'towerButton2').setInteractive();
		this.tower3Button = this.add.sprite(0,0, 'towerButton3').setInteractive();

		this.tower1Button.x = 430;
		this.tower1Button.y = 70;

		this.tower2Button.x = 515;
		this.tower2Button.y = 70;

		this.tower3Button.x = 600;
		this.tower3Button.y = 70;



		this.tower1Button.on('pointerdown', function(pointer) {
			this.turretType = 1;
		}.bind(this));
		
		this.tower2Button.on('pointerdown', function(pointer) {
			this.turretType = 2;
		}.bind(this));

		this.tower3Button.on('pointerdown', function(pointer) {
			this.turretType = 3;
		}.bind(this));

		this.tower1Button.on('pointerover', function (pointer) {
			this.tower1Button.setTexture('towerButton1Hover');
		}.bind(this));

		this.tower1Button.on('pointerout', function (pointer) {
			this.tower1Button.setTexture('towerButton1');
		}.bind(this));

		this.tower2Button.on('pointerover', function (pointer) {
			this.tower2Button.setTexture('towerButton2Hover');
		}.bind(this));

		this.tower2Button.on('pointerout', function (pointer) {
			this.tower2Button.setTexture('towerButton2');
		}.bind(this));

		this.tower3Button.on('pointerover', function (pointer) {
			this.tower3Button.setTexture('towerButton3Hover');
		}.bind(this));

		this.tower3Button.on('pointerout', function (pointer) {
			this.tower3Button.setTexture('towerButton3');
		}.bind(this));
	
	}

	createGroups() {
		this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
		this.turrets = this.add.group({ classType: Turret, runChildUpdate: true });
		this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });


		this.physics.add.overlap(this.enemies, this.bullets, this.damageEnemy.bind(this));
		this.input.on('pointerdown', this.placeTurret.bind(this));
	}

	createCursor() {
		this.cursor = this.add.image(32, 32, 'cursor');
		this.cursor.setScale(2);
		this.cursor.alpha = 0;

		this.input.on('pointermove', function (pointer) {
			var i = Math.floor(pointer.y / 64);
			var j = Math.floor(pointer.x / 64);

			if (this.canPlaceTurret(i, j)) {
				this.cursor.setPosition(j *64 + 32, i * 64 + 32);
				this.cursor.alpha = 0.8;
			} else {
				this.cursor.alpha = 0;
			}
		}.bind(this));
	}

	canPlaceTurret(i, j) {
		if (this.turretType === 1) {
			return this.map[i][j] === 0 && this.score >= 60;
		}
		else if (this.turretType ===2) {
			return this.map[i][j] === 0 && this.score >= 80;
		}
		else if (this.turretType ===3) {
			return this.map[i][j] === 0 && this.score >= 120;
		}
	}

	createPath() {
		this.graphics = this.add.graphics();
		// the path for enemies to follow
		this.path = this.add.path(-32, 30);
		this.path.lineTo(160, 30);
		// this.path.lineTo(150, 30);
		this.path.lineTo(160, 416);
		this.path.lineTo(700, 416);



		//visualizing the path
		// this.graphics.lineStyle(3, 0xffffff, 1);
		// this.path.draw(this.graphics);
	}

	createMap(x) {
		// create map
		this.bgMap = this.make.tilemap({ key: 'level2' });
		// add tileset image
		this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
		// create bg layer
		this.backgroundLayer = this.bgMap.createStaticLayer('Background', this.tiles, 0, 0);
		// add tower
		// this.angle = -90
		this.add.image(610, 420, 'base');
		// this.image.angle = -90;
	}

	getEnemy(x, y, distance) {
		var enemyUnits = this.enemies.getChildren();
		for (var i = 0; i < enemyUnits.length; i++) {
			if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance) {
				return enemyUnits[i];
			}
		}
		return false;
	}

	addBullet(x, y, angle, tType) {
		var bullet = this.bullets.getFirstDead();
		if (!bullet) {
			bullet = new Bullet(this, 0, 0);
			this.bullets.add(bullet);
		}
		bullet.fire(x, y, angle, tType);

	}

	placeTurret(pointer) {
		var i = Math.floor(pointer.y / 64);
		var j = Math.floor(pointer.x / 64);

		if (this.canPlaceTurret(i, j)) {
			var turret = this.turrets.getFirstDead();
			if (!turret) {
				if(this.turretType === 1){
					turret = new Turret(this, 0, 0, this.map);
				}
				else if(this.turretType === 2){
					turret = new Turret2(this, 0, 0, this.map);
				}
				else{
					turret = new Turret3(this, 0, 0, this.map);
				}
				this.turrets.add(turret);
			}
			turret.setActive(true);
			turret.setVisible(true);
			turret.place(i, j);
			// this.updateTurrets(-1);
			if (this.turretType === 1){
				this.updateScore(-40);
			}
			else if (this.turretType === 2){
				this.updateScore(-60);
			}
			else{
				this.updateScore(-120);
			}
		}
	}

	damageEnemy(enemy, bullet) {
		if (enemy.active === true && bullet.active === true) {
			bullet.setActive(false);
			bullet.setVisible(false);
			// slows if turret 2 bullet
			if (bullet.tType === 2)
			{
				enemy.receiveSlow(this.level);
			}
			//lower enemy hp
			
			enemy.receiveDamage(levelConfig.initial.bulletDamage * (3/bullet.tType));
		}
	}

}