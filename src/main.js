import 'phaser';
// import config from './config/config';
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

const game = new Phaser.Game(config);