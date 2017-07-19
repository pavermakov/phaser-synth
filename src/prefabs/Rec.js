import Phaser from 'phaser';
import Sprite from './base/Sprite';

export default class extends Sprite {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;
		this.hide();

		this.game.add.existing(this);
	}
}
