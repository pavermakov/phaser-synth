import Phaser from 'phaser';

class Store {
	constructor() {
		this.game = window.game;
		this.init();
	}

	init() {
		this.initData()
				.initSignals();
	}

	initData() {
		this.states = this.game.state.states;

		this.score = 0;
		this.totalLives = 3;
		this.totalKeys = 4;
		this.keyColors = [0x421964, 0x18D5EE, 0xBA1D50, 0xB7A4CC];

		this.sequence = [];
		this.playerSequence = [];
		this.sequenceInterval = 400;
		this.sequenceIntervalStep = 25;

		this.signals = {
			onNewKeyPushed: new Phaser.Signal(),
			onNewPlayerKeyPushed: new Phaser.Signal(),
			onScoreIncreased: new Phaser.Signal(),
			onLivesDecreased: new Phaser.Signal(),
			onOutOfLives: new Phaser.Signal(),
		};

		return this;
	}

	initSignals() {
		this.states.Play.onStateReady.add(this.fetchPlayStateSignals, this);

		return this;
	}

	fetchPlayStateSignals(state) {
		const {
			onNewKey,
			onNewPlayerKey,
			onPlayerError,
			onPlayerSuccess,
			onLevelUp,
		} = state.getSignals();

		onNewKey.add(this.addKeyToSequence, this);
		onNewPlayerKey.add(this.addKeyToPlayerSequence, this);
		onPlayerError.add(this.handlePlayerError, this);
		onPlayerSuccess.add(this.handlePlayerSuccess, this);
		onLevelUp.add(this.descreaseInterval, this);
	}

	handlePlayerSuccess() {
		this.clearPlayerSequence();
		this.increaseScore();
	}

	handlePlayerError() {
		this.clearPlayerSequence();

		if (this.totalLives > 0) {
			this.descreaseLives();
		} else {
			this.signals.onOutOfLives.dispatch();
		}
	}

	addKeyToSequence(key) {
		this.sequence.push(key);
		this.signals.onNewKeyPushed.dispatch();
	}

	addKeyToPlayerSequence(key) {
		this.playerSequence.push(key);
		this.signals.onNewPlayerKeyPushed.dispatch();
	}

	increaseScore() {
		this.score += 1;
		this.signals.onScoreIncreased.dispatch(this.score);
	}

	descreaseLives() {
		this.totalLives -= 1;
		this.signals.onLivesDecreased.dispatch();
	}

	descreaseInterval() {
		this.sequenceInterval -= this.sequenceIntervalStep;
	}

	clearPlayerSequence() {
		this.playerSequence.length = 0;
	}

	getSignals() {
		return this.signals;
	}
}

export let store = null;

export const init = () => {
	store = new Store();
	return store;
};
