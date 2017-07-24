import Phaser from 'phaser';
import Button from './base/Button';
import { store } from '../store/';

export default class extends Button {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;
		this.store = store;

		this.initSignals(options);

		this.game.add.existing(this);
	}

	initSignals({ uiSignals }) {
		const { onPauseClick } = uiSignals;

		onPauseClick.add(this.toggle, this);

		return this;
	}

	toggle() {
		this.frame = this.frame === 2 ? 3 : 2;
	}
}
