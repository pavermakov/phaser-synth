import Phaser from 'phaser';
import Graphics from './base/Graphics';

export default class extends Graphics {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;

		this.draw(options);

		this.game.add.existing(this);
	}

	draw({ x, y, width, height, color, separatorColor, separatorWidth, isTop }) {
		this.beginFill(color);
		this.drawRect(x, y, width, height);

		this.lineStyle(separatorWidth, separatorColor, 1);

		if (isTop) {
			this.moveTo(x, height);
			this.lineTo(width, height);
		} else {
			this.lineTo(width, 0);
		}


		this.endFill();

		return this;
	}


}
