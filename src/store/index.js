import Phaser from 'phaser';

class Store {
	constructor(game) {
		this.game = game;

		this.init();
	}

	init() {
		this.initData()
				.initSignals();
	}

	initData() {
		this.states = this.game.state.states;

		this.score = 0;
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
		onPlayerError.add(this.clearPlayerSequence, this);
		onPlayerSuccess.add(this.clearPlayerSequence, this);
		onLevelUp.add(this.descreaseInterval, this);
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

export default Store;
