import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
	constructor() {
		super({
            key: 'Preloader'
        });
	}

	init() {
		this.readyCount = 0;
	}

	preload() {


		// time event for logo
		// TODO - update delayedCall time
		this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);
		this.createPreloader();
		this.loadAssets();
	}

	createPreloader() {
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;

		// add logo image
		this.add.image(width / 2 , height / 2 - 100, 'logo');

		// progress bar
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(width / 2 - 160, height /2 - 30, 320, 50);

		// loading text

		var loadingText = this.make.text({
			x: width /2,
			y: height /2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		var percentText = this.make.text({
			x: width /2,
			y: height /2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		var assetText = this.make.text({
			x: width /2,
			y: height /2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);

		//update progress bar
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
		});

		//update file progress text
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});

		// remove progress bar when complete
		this.load.on('complete', function () {
			progressBox.destroy();
			progressBar.destroy();
			assetText.destroy();
			loadingText.destroy();
			percentText.destroy();
			this.ready();
		}.bind(this));
	}

	loadAssets() {
		this.load.image('bullet', 'assets/level/bulletDark2_outline.png');
		this.load.image('tower', 'assets/level/tank_bigRed.png');
		this.load.image('tower2', 'assets/level/tank_darkLarge.png');
		this.load.image('tower3', 'assets/level/tank_huge.png');
		this.load.image('enemy', 'assets/level/tank_sand.png');
		this.load.image('enemy2', 'assets/level/tank_blue.png');
		this.load.image('enemy3', 'assets/level/tank_dark.png');
		this.load.image('base', 'assets/level/tankBody_darkLarge_outline.png');
		this.load.image('title', 'assets/ui/title.png');
		this.load.image('gameOver', 'assets/ui/gameOver.png');
		this.load.image('gameWin', 'assets/ui/gameWin.png');


		this.load.image('cursor', 'assets/ui/cursor.png');
		this.load.image('blueButton1', 'assets/ui/blue_button02.png');
		this.load.image('blueButton2', 'assets/ui/blue_button03.png');
		this.load.image('redButton1', 'assets/ui/red_button1.png');
		this.load.image('redButton2', 'assets/ui/red_button2.png');

		this.load.image('towerButton1', 'assets/ui/tower1_button.png');
		this.load.image('towerButton2', 'assets/ui/tower2_button.png');
		this.load.image('towerButton3', 'assets/ui/tower3_button.png');

		this.load.image('towerButton1Hover', 'assets/ui/tower1_hover.png');
		this.load.image('towerButton2Hover', 'assets/ui/tower2_hover.png');
		this.load.image('towerButton3Hover', 'assets/ui/tower3_hover.png');




		// tile map
		this.load.tilemapTiledJSON('level1', 'assets/level/level1.json');
		this.load.tilemapTiledJSON('level2', 'assets/level/level2.json');
		this.load.spritesheet('terrainTiles_default', 'assets/level/terrainTiles_default.png', { frameWidth: 64, frameHeight: 64});


	}

	ready () {
		this.readyCount++;
		if (this.readyCount === 2) {
			// TODO: switch to title screen
			this.scene.start('Title');
			// this.scene.start('GameOver');
			
		}
	}
}