import Phaser from 'phaser';
import Graphics from './base/Graphics';

export default class extends Graphics {
	constructor(game, options) {
		super(game, options);

		this._init(game, options);
	}

	_init(game, options) {
		this.game = game;

		this._addData(options)
				._addSignals()
				._addEvents()
				._draw(options);

		this.game.add.existing(this);
	}

	_addData({ id }) {
		this.data = {
			id,
			signals: {},
		};

		return this;
	}

	_addSignals() {
		this.data.signals.tapSignal = new Phaser.Signal();

		return this;
	}

	_addEvents() {
		this.events.onInputDown.add(this._handleTap, this);

		return this;
	}

	_draw({ x, y, width, height, color }) {
		this.beginFill(color);
		this.drawRect(x, y, width, height);
		this.endFill();

		return this;
	}

	_handleTap() {
		const { id, signals } = this.data;

		signals.tapSignal.dispatch(id);
	}

	toggleInput(isEnabled) {
		this.enabled = isEnabled;

		return this;
	}

	getSignals() {
		return this.data.signals;
	}
}
