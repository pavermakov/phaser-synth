import Phaser from 'phaser';
import Sprite from './base/Sprite';

export default class extends Sprite {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;

		this.initData()
				.moveOffScreen();

		this.game.add.existing(this);
	}

	initData() {
		this.data = {
			revealTween: this.game.add.tween(this),
			hideTween: this.game.add.tween(this),
			tweenDuration: 200,
			tweenEasing: Phaser.Easing.Cubic.InOut,
		};

		return this;
	}

	moveOffScreen() {
		this.x = this.game.width + this.width;

		return this;
	}

	reveal() {
		const { revealTween, tweenDuration, tweenEasing } = this.data;
		revealTween.to({ x: this.game.width }, tweenDuration, tweenEasing, true);
	}

	hide() {
		const { hideTween, tweenDuration, tweenEasing } = this.data;
		hideTween.to({ x: this.game.width + this.width }, tweenDuration, tweenEasing, true);
	}
}
