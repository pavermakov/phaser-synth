import Phaser from 'phaser';

export default class extends Phaser.Graphics {
	constructor(game, { x, y, inputEnabled, anchor, scale }) {
		super(game, x, y);

		this.inputEnabled = inputEnabled || true;

		if (anchor) {
			this.anchor.setTo(anchor.x, anchor.y);
		}

		if (scale) {
			this.scale.setTo(scale.x, scale.y);
		}
	}
}
