import 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import Level2Scene from './scenes/Level2Scene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import GameOverScene from './scenes/GameOverScene';
import GameWinScene from './scenes/GameWinScene';
import UIScene from './scenes/UIScene';
import UIScene2 from './scenes/UIScene2';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
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
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        Level2Scene,
        PreloaderScene,
        GameOverScene,
        GameWinScene,
        UIScene,
        UIScene2
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars

// class Game extends Phaser.Game {
//     constructor() {
//         super(config);
//         this.scene.add('Game', GameScene);
//         this.scene.add('Level2', Level2Scene);
//         this.scene.add('Boot', BootScene);
//         this.scene.add('Preloader', PreloaderScene);
//         this.scene.add('Title', TitleScene);
//         this.scene.add('GameOver', GameOverScene);
//         this.scene.add('GameWin', GameWinScene);
//         this.scene.add('UI', UIScene);
//         this.scene.add('UI2', UIScene2);
//         this.scene.start('Boot');

//     }
// }




// window.onload = function () {
//     window.game = new Game();
//     resize();
//     window.addEventListener('resize', resize, false);
// }

// function resize() {
//     var canvas = document.querySelector('canvas');
//     var windowWidth = window.innerWidth;
//     var windowHeight = window.innerHeight;
//     var windowRatio = windowWidth / windowHeight;
//     var gameRatio = config.width / config.height;
//     if (windowRatio < gameRatio) {
//         canvas.style.width = windowWidth + 'px';
//         canvas.style.height = (windowWidth / gameRatio) + 'px';
//     }else {
//         canvas.style.width = (windowHeight * gameRatio) + 'px';
//         canvas.style.height = windowHeight + 'px';
//     }
// }