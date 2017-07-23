import Phaser from 'phaser';

export default class extends Phaser.Text {
	constructor(game, { x, y, text, style, inputEnabled, anchor, scale, exists }) {
		super(game, x, y, text, style);

		this.inputEnabled = inputEnabled || true;
		this.exists = exists || true;

		if (anchor) {
			this.anchor.setTo(anchor.x, anchor.y);
		}

		if (scale) {
			this.scale.setTo(scale.x, scale.y);
		}
	}
}
