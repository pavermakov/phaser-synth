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
}
