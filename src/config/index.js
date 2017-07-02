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
			shortUrlKey: '',
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

export default config;
