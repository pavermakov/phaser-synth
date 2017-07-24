import Phaser from 'phaser';
import Text from './base/Text';
import Sprite from './base/Sprite';
import { store } from '../store/';
import utils from '../utils/';

export default class extends Sprite {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;
		this.store = store;

		this.initData()
				.initSignals(options);

		this.game.add.existing(this);
		this.initTexts();
	}

	initData() {
		this.data = {
			header: null,
			restart: null,
			signals: {
				onGameRestart: new Phaser.Signal(),
			},
		};

		return this;
	}

	initTexts() {
		this.initHeader();
				// .initRestart();

		return this;
	}

	initHeader() {
		const options = {
			x: this.game.world.centerX,
			y: this.game.world.centerY - 20,
			text: 'GAME OVER',
			style: {
				font: 'bold 30px Quicksand',
				fill: 'white',
			},
			anchor: {
				x: 0.5,
				y: 0.5,
			},
			exists: false,
		};

		// TODO: refactor
		this.data.header = new Text(this.game, options);
		this.game.add.existing(this.data.header);
		this.data.header.exists = false;

		return this;
	}

	initRestart() {
		const options = {
			x: this.game.world.centerX,
			y: this.game.world.centerY + 20,
			text: 'RESTART',
			style: {
				font: 'bold 20px Quicksand',
				fill: 'white',
			},
			anchor: {
				x: 0.5,
				y: 0,
			},
			exists: false,
		};

		// TODO: refactor
		this.data.restart = new Text(this.game, options);
		this.game.add.existing(this.data.restart);
		this.data.restart.exists = false;

		this.data.restart.events.onInputDown.add(this.restartGame, this);

		return this;
	}

	initSignals() {
		const { onOutOfLives } = this.store.getSignals();
		onOutOfLives.add(this.toggle, this);

		return this;
	}

	toggle() {
		// TODO: refactor
		if (this.exists) {
			this.data.header.exists = false;
			// this.data.restart.exists = false;
			this.hide();
		} else {
			this.data.header.exists = true;
			// this.data.restart.exists = true;
			this.reveal();
		}
	}

	restartGame() {
		this.toggle();
		this.data.signals.onGameRestart.dispatch();
	}

	getSignals() {
		return this.data.signals;
	}
}
