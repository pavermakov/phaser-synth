import Graphics from './base/Graphics';

export default class extends Graphics {
	constructor(game, options) {
		super(game, options);
		this._init(game, options);
	}

	_init(game, options) {
		this.game = game;

		this._draw(options);
		this.game.add.existing(this);
	}

	_draw({ x, y, width, height, color }) {
		this.beginFill(color);
		this.drawRect(x, y, width, height);
		this.endFill();
	}
}
