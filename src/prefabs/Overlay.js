import Phaser from 'phaser';
import Sprite from './base/Sprite';

export default class extends Sprite {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;

		this.initSignals(options);

		this.game.add.existing(this);
	}

	initSignals({ uiSignals }) {
		const { onPauseClick } = uiSignals;

		onPauseClick.add(this.toggle, this);

		return this;
	}

	toggle() {
		if (this.exists) {
			this.hide();
		} else {
			this.reveal();
		}
	}
}
