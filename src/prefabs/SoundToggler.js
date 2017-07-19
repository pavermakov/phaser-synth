import Phaser from 'phaser';
import Button from './base/Button';

export default class extends Button {
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
		const { onSoundClick } = uiSignals;

		onSoundClick.add(this.toggle, this);

		return this;
	}

	toggle() {
		this.frame = this.frame === 0 ? 1 : 0;
		this.game.sound.mute = !this.game.sound.mute;
	}
}
