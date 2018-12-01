import 'phaser';

class BootScene extends Phaser.Scene {
	constructor() {
        super({
            key: 'Boot'
        });
	}

	preload() {
		this.load.image('logo', 'assets/logo/benninkc_logo.png');
	}

	create() {
		this.scene.start('Preloader');
	}
}

export default BootScene;