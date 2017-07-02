import Phaser from 'phaser';
import Graphics from './base/Graphics';

export default class extends Graphics {
	constructor(game, options) {
		super(game, options);

		this._init(game, options);
	}

	_init(game, options) {
		this.game = game;

		this._draw(options)
				._addData(options)
				._addSound()
				._addSignals()
				._addEvents();

		this.game.add.existing(this);
	}

	_draw({ width, height, color }) {
		this.beginFill(color);
		this.drawRect(0, 0, width, height);
		this.endFill();

		return this;
	}

	_addData({ id, color }) {
		this.data = {
			id,
			color,
			signals: {},
			sound: null,
			tweens: {},
		};

		return this;
	}

	_addSound() {
		this.data.sound = this.game.add.audio(`key-${this.data.id}`, 1, false);

		return this;
	}

	_addSignals() {
		this.data.signals.tapSignal = new Phaser.Signal();

		return this;
	}

	_addEvents() {
		this.events.onInputDown.add(this._handleInputDown, this);
		this.events.onInputUp.add(this._handleInputUp, this);

		return this;
	}

	_handleInputDown() {
		const { id, signals } = this.data;

		signals.tapSignal.dispatch(id);

		this.activate();
	}

	_handleInputUp() {
		this._changeAlpha(1);
	}

	activate(isMachine) {
		this._playSound()
				._changeAlpha(0.7)
				._animate();

		if (isMachine) {
			setTimeout(this._changeAlpha.bind(this, 1), 130);
		}
	}

	toggleInput(isEnabled) {
		this.enabled = isEnabled;

		return this;
	}

	_animate() {
		return this;
	}

	_changeAlpha(alpha) {
		this.alpha = alpha;

		return this;
	}

	_playSound() {
		this.data.sound.play();

		return this;
	}

	getSignals() {
		return this.data.signals;
	}
}
