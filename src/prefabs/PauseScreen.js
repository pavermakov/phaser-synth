import Phaser from 'phaser';
import Text from './base/Text';
import Sprite from './base/Sprite';
import { store } from '../store/';

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
		this.initText();
	}

	initData() {
		this.data = {
			text: null,
		};

		return this;
	}

	initText() {
		const options = {
			x: this.game.world.centerX,
			y: this.game.world.centerY,
			text: 'PAUSED',
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

		this.data.text = new Text(this.game, options);
		this.game.add.existing(this.data.text);
		this.data.text.exists = false;

		return this;
	}

	initSignals({ uiSignals }) {
		const { onPauseClick } = uiSignals;

		onPauseClick.add(this.toggle, this);

		return this;
	}

	toggle() {
		if (this.store.isGameOver) return;

		if (this.exists) {
			this.data.text.exists = false;
			this.hide();
		} else {
			this.data.text.exists = true;
			this.reveal();
		}
	}
}
