import Phaser from 'phaser';

export default class extends Phaser.Button {
	constructor(game, { x, y, key, callback, callbackContext, frame, anchor, scale }) {
		super(game, x, y, key, callback, callbackContext);

		this.frame = frame;

		if (anchor) {
			this.anchor.setTo(anchor.x, anchor.y);
		}

		if (scale) {
			this.scale.setTo(scale.x, scale.y);
		}
	}
}
