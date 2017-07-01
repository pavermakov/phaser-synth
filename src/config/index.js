import Phaser from 'phaser';
import utils from '../utils/';

const config = {
	size: {
		width: 320,
		height: 568,
	},
	renderer: Phaser.CANVAS,
	parent: 'content',
	antialias: true,
	api: {
		google: {
			shortUrlKey: 'AIzaSyDMoGLmBh3yVbae-ezA5Hp1ubVkSCIL7vU',
		},
	},
	shareUrl: '',
	dpi: window.devicePixelRatio,
	resolution: utils.getResolution(),
	paths: {
		images: 'assets/images/',
		sounds: 'assets/sounds/',
		spritesheets: 'assets/spritesheets/',
	},
};

config.size.width = Math.ceil(config.size.width * window.devicePixelRatio);
config.size.height = Math.ceil(config.size.height * window.devicePixelRatio);

export default config;
