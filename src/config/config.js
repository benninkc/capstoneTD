export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 640,
    height: 512,
    pixelArt: true,
    roundPIxels: true,
    physics: {
    	default: 'arcade', 
    	arcade: {
    		debug: false,
    		gravity: { y: 0 }
    	}
    }
};