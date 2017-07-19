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

		this.initPreloadBar();
	}

	preload() {
		this.loadAssets()
				.loadFonts();

		this.load.onFileComplete.add(this.updatePreloadBar, this);
		this.load.onLoadComplete.addOnce(this.finishAssets, this);
	}

	loadAssets() {
		const { paths } = config;
		const { images, spritesheets, sounds } = settings;

		let i = null;
		let key = null;

		// loading images
		for (i = 0; i < images.length; i += 1) {
			key = images[i];
			this.load.image(key, `${paths.images}${key}.png`);
		}

		// load spritesheets
		for (i = 0; i < images.length; i += 1) {
			const { framesCount, frameSize } = spritesheets[i];
			key = spritesheets[i].key;

			this.load.spritesheet(key, `${paths.spritesheets}${key}.png`, frameSize.w, frameSize.h, framesCount);
		}

		// loading sounds
		for (i = 0; i < sounds.length; i += 1) {
			key = sounds[i];
			this.load.audio(key, [`${paths.sounds}${key}.mp3`, `${paths.sounds}${key}.ogg`]);
		}

		return this;
	}

	loadFonts() {
		WebFont.load({
			google: {
				families: ['Quicksand'],
			},
			active: this.finishFonts.bind(this),
		});

		return this;
	}

	initPreloadBar() {
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

	removePreloadBar() {
		this.$preloadBar.remove();
	}

	updatePreloadBar(progress) {
		this.$preloadLevel.css('width', `${progress}%`);
	}

	finishAssets() {
		this.assetsReady = true;
		this.checkLoadingState();
	}

	finishFonts() {
		this.fontsReady = true;
		this.checkLoadingState();
	}

	checkLoadingState() {
		if (this.assetsReady && this.fontsReady) {
			this.completeLoading();
		}
	}

	completeLoading() {
		this.removePreloadBar();
		utils.switchState(this, 'Play');
	}
}
