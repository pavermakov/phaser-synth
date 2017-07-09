import Phaser from 'phaser';
import Graphics from './base/Graphics';

export default class extends Graphics {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;

		this.draw(options)
			.initData(options)
			.initSignals()
			.initSound()
			.initEvents();

		this.game.add.existing(this);
	}

	draw({ width, height, color }) {
		this.beginFill(color);
		this.drawRect(0, 0, width, height);
		this.endFill();

		return this;
	}

	initData({ id, color }) {
		this.data = {
			id,
			color,
			sound: null,
			tweens: {},
			signals: {
				onKeyTapped: new Phaser.Signal(),
			},
		};

		return this;
	}

	initSignals() {
		const { onKeyEnable, onKeyDisable, onKeyActive } = this.game.state.states.Play.getSignals();

		onKeyEnable.add(this.toggleInput, this, 0, true);
		onKeyDisable.add(this.toggleInput, this, 0, false);
		onKeyActive.add(this.activate, this);

		return this;
	}

	initSound() {
		this.data.sound = this.game.add.audio(`key-${this.data.id}`, 1, false);

		return this;
	}

	initEvents() {
		this.events.onInputDown.add(this._handleInputDown, this);
		this.events.onInputUp.add(this._handleInputUp, this);

		return this;
	}

	_handleInputDown() {
		const { id, signals } = this.data;
		signals.onKeyTapped.dispatch(id);

		this.activate(id);
	}

	_handleInputUp() {
		this._changeAlpha(1);
	}

	activate(id, isMachine = false) {
		if (this.data.id !== id) return;

		this._playSound()
			._changeAlpha(0.7);

		if (isMachine) {
			setTimeout(this._changeAlpha.bind(this, 1), 130);
		}
	}

	toggleInput(isEnabled) {
		this.input.enabled = isEnabled;

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
