import Phaser from 'phaser';
import * as store from '../../store/';
import config from '../../config/';
import utils from '../../utils/';
import settings from './settings';

export default class extends Phaser.State {
	init() {
		this.initData();
		this.initSettings();
	}

	preload() {
		const { paths } = config;

		this.load.image('loading', `${paths.images}loading.png`);
		this.load.onLoadComplete.addOnce(this.finishAssets, this);
	}

	initData() {
		this.game = window.game;
		this.store = store.init();
	}

	initSettings() {
		const game = this.game;
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

	finishAssets() {
		utils.switchState(this, 'Preload');
	}
}
