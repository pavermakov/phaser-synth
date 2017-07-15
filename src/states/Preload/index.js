import Phaser from 'phaser';
import WebFont from 'webfontloader';
import config from '../../config/';
import settings from './settings';
import utils from '../../utils/';

export default class extends Phaser.State {
	init() {
		this.fontsReady = false;
		this.assetsReady = false;
		this.apiReady = false;

		this._initPreloadBar();
	}

	preload() {
		this._loadAssets();

		this.load.onFileComplete.add(this._updatePreloadBar, this);
		this.load.onLoadComplete.addOnce(this._finishAssets, this);
	}

	_loadAssets() {
		const { paths } = config;
		const { images, sounds } = settings;

		let i = null;
		let key = null;

		// loading images
		for (i = 0; i < images.length; i += 1) {
			key = images[i];
			this.load.image(key, `${paths.images}${key}.png`);
		}

		// loading sounds
		for (i = 0; i < sounds.length; i += 1) {
			key = sounds[i];
			this.load.audio(key, [`${paths.sounds}${key}.mp3`, `${paths.sounds}${key}.ogg`]);
		}
	}

	_initPreloadBar() {
		this.$preloadBar = jQuery('.preloader');
		this.$preloadLevel = this.$preloadBar.find('.preloader__front');
		const $content = jQuery('#content');

		const props = {
			y: Math.ceil(window.innerHeight * 0.6),
			width: Math.ceil($content.width() * 0.6),
		};

		this.$preloadBar.css({
			top: `${props.y}px`,
			left: '50%',
			width: `${props.width}px`,
			transform: 'translate(-50%)',
			'-webkit-transform': 'translate(-50%)',
		});
	}

	_removePreloadBar() {
		this.$preloadBar.remove();
	}

	_updatePreloadBar(progress) {
		this.$preloadLevel.css('width', `${progress}%`);
	}

	_finishAssets() {
		this.assetsReady = true;

		// temporarily
		this._completeLoading();
	}

	_completeLoading() {
		this._removePreloadBar();
		utils.switchState(this, 'Play');
	}
}
