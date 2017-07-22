import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, { x, y, key, frame, inputEnabled, anchor, scale, alpha, exists }) {
		super(game, x, y, key, frame);

		this.inputEnabled = inputEnabled || true;
		this.alpha = alpha || 1;
		this.exists = exists || true;

		if (anchor) {
			this.anchor.setTo(anchor.x, anchor.y);
		}

		if (scale) {
			this.scale.setTo(scale.x, scale.y);
		}
	}

	hide() {
		this.exists = false;
	}

	reveal() {
		this.exists = true;
	}
}
