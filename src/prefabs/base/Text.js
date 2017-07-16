import Phaser from 'phaser';

export default class extends Phaser.Text {
	constructor(game, { x, y, text, style, inputEnabled, anchor, scale }) {
		super(game, x, y, text, style);

		this.inputEnabled = inputEnabled || true;

		if (anchor) {
			this.anchor.setTo(anchor.x, anchor.y);
		}

		if (scale) {
			this.scale.setTo(scale.x, scale.y);
		}
	}

	setText(newText) {
		super.setText(newText);
	}
}
