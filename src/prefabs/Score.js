import Phaser from 'phaser';
import Text from './base/Text';

export default class extends Text {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;

		this.game.add.existing(this);
	}

	setText(newText) {
		const bounce = this.game.add.tween(this);
		const easing = Phaser.Easing.Bounce.In;

		bounce.to({ y: '-10' }, 50, easing, false)
					.yoyo(true)
					.start();

		super.setText(newText);
	}
}
