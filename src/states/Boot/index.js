import Phaser from 'phaser';
import Store from '../../store/';
import config from '../../config/';
import utils from '../../utils/';
import settings from './settings';

export default class extends Phaser.State {
	init() {
		this._initStore();
		this._initSettings();
		this._stretchCanvas();
	}

	preload() {
		const { paths, resolution } = config;

		this.load.image('loading', `${paths.images}loading.png`);

		this.load.onLoadComplete.addOnce(this._finishAssets, this);
	}

	_initStore() {
		window.game.Store = new Store(window.game);
		this.Store = window.game.Store;
	}

	_initSettings() {
		const game = this.Store.game;
		const paths = [
			game,
			game.input,
			game.stage,
			game.scale,
			game.renderer,
			game.renderer.renderSession,
			game.time,
		];

		Object.keys(settings).forEach(key => {
			paths.forEach(path => {
				if (path[key] !== undefined) {
					path[key] = settings[key];
				}
			});
		});
	}

	_stretchCanvas() {
		const $content = jQuery('#content');
		const $contentWidth = $content.width();
		const $contentHeight = $content.height();
		const isCanvasWider = $contentWidth > window.innerWidth;
		const isCanvasTaller = $contentHeight > window.innerHeight;

		let ratio;

		if (isCanvasWider && !isCanvasTaller) {
			ratio = window.innerWidth / $contentWidth;

			$content.width(window.innerWidth);
			$content.height(Math.ceil($contentHeight * ratio));
		} else if (!isCanvasWider && isCanvasTaller) {
			ratio = window.innerHeight / $contentHeight;

			$content.width($content.width * ratio);
			$content.height(window.innerHeight);
		} else if ($contentHeight > $contentWidth) {
			ratio = window.innerHeight / $contentHeight;

			$content.width($content.width * ratio);
			$content.height(window.innerHeight + 1);
		} else if ($contentHeight < $contentWidth) {
			ratio = window.innerWidth / $contentWidth;

			$content.width($content.width * ratio);
			$content.height(window.innerHeight);
		}
	}

	_finishAssets() {
		utils.switchState(this, 'Preload');
	}
}
