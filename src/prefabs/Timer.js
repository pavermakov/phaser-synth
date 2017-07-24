import Phaser from 'phaser';
import Text from './base/Text';
import { store } from '../store/';

export default class extends Text {
	constructor(game, options) {
		super(game, options);

		this.init(game, options);
	}

	init(game, options) {
		this.game = game;
		this.store = store;

		this.initData()
				.initSignals(options);

		this.game.add.existing(this);
	}

	initData() {
		this.data = {
			timer: this.game.time.create(false),
			timerText: this.formatTime(store.secondsLasted),
		};

		this.data.timer.loop(1000, this.updateTimerText, this);

		return this;
	}

	initSignals({ uiSignals }) {
		const { onPauseClick } = uiSignals;

		onPauseClick.add(this.toggle, this);

		return this;
	}

	start() {

		this.data.timer.start();
	}

	toggle() {
		if (this.data.timer.paused) {
			this.resume();
		} else {
			this.pause();
		}
	}

	pause() {
		this.data.timer.pause();
	}

	resume() {
		this.data.timer.resume();
	}

	reset() {
		this.data.timer.stop();
	}

	updateTimerText() {
		this.setText(this.formatTime(Math.floor(this.data.timer.seconds)));
	}

	formatTime(time) {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;

		if (minutes < 10) minutes = `0${minutes}`;
		if (seconds < 10) seconds = `0${seconds}`;

		return `${minutes}:${seconds}`;
	}
}
