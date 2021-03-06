import Phaser from 'phaser';
import Key from '../../prefabs/Key';
import UI from '../../prefabs/UI';
import { store } from '../../store/';
import utils from '../../utils/';

export default class extends Phaser.State {
	init() {
		this.store = store;
		this.game = window.game;
		this.world = this.game.world;

		this.initData();
		this.initSignals();
	}

	create() {
		this.synthKeys = this.createKeys();
		this.UI = this.createUI();

		utils.revealCamera(this, this.store.cameraShiftColor, this.store.cameraShiftDuration, this.start);
	}

	initData() {
		this.data = {
			currentIndex: 0,
			sequenceTimer: this.game.time.create(false),
			signals: {
				onPlayStateReady: this.onStateReady,
				onNewKey: new Phaser.Signal(),
				onNewPlayerKey: new Phaser.Signal(),
				onKeyDisable: new Phaser.Signal(),
				onKeyEnable: new Phaser.Signal(),
				onKeyActive: new Phaser.Signal(),
				onPlayerError: new Phaser.Signal(),
				onPlayerSuccess: new Phaser.Signal(),
				onLevelUp: new Phaser.Signal(),
				onPauseStateChange: new Phaser.Signal(),
				onSoundStateChange: new Phaser.Signal(),
				onSequenceStart: new Phaser.Signal(),
				onSequenceStop: new Phaser.Signal(),
			},
		};

		return this;
	}

	initSignals() {
		const {
			onNewKeyPushed,
			onNewPlayerKeyPushed,
			onSequenceStateChange,
			onGamePause,
			onGameResume } = this.store.getSignals();

		onNewKeyPushed.add(this.playSequence, this);
		onNewPlayerKeyPushed.add(this.compareSequence, this);
		onSequenceStateChange.add(this.handleSequenceStateChange, this);
		onGamePause.add(this.handleGamePause, this);
		onGameResume.add(this.handleGameResume, this);

		return this;
	}

	start() {
		this.onStateReady.dispatch(this);

		this.addNewKey();
	}

	createKeys() {
		const keys = [];
		const { totalKeys, keyColors } = this.store;

		let tempKey = null;
		let i = null;

		const options = {
			id: null,
			x: null,
			y: 0,
			width: this.world.width / totalKeys,
			height: this.world.height,
			color: null,
			inputEnabled: true,
		};

		for (i = 0; i < totalKeys; i += 1) {
			options.x = options.width * i;
			options.color = keyColors[i];
			options.id = i + 1;

			tempKey = new Key(this.game, options);

			this.initSynthKeySignals(tempKey);
			keys.push(tempKey);
		}

		return keys;
	}

	initSynthKeySignals(key) {
		const { onKeyTapped } = key.getSignals();
		onKeyTapped.add(this.processTap, this);

		return this;
	}

	createUI() {
		const ui = this.game.UI = new UI(this.game);
		const { onPauseClick, onSoundClick, onGameRestart } = ui.getSignals();

		onPauseClick.add(this.handlePauseClick, this);
		onSoundClick.add(this.handleSoundClick, this);
		onGameRestart.add(this.restart, this);

		return ui;
	}

	processTap(id) {
		this.data.signals.onNewPlayerKey.dispatch(id);
	}

	playSequence() {
		const { sequence, sequenceInterval } = this.store;

		this.data.signals.onKeyDisable.dispatch();
		this.data.signals.onSequenceStart.dispatch();

		this.data.sequenceTimer.repeat(sequenceInterval, sequence.length, this.activateSynthKey, this);
		this.data.sequenceTimer.start();
	}

	activateSynthKey() {
		const { sequence } = this.store;
		const { currentIndex } = this.data;

		this.data.signals.onKeyActive.dispatch(sequence[currentIndex], true);

		if (currentIndex === sequence.length - 1) {
			this.data.signals.onKeyEnable.dispatch();
			this.data.currentIndex = 0;

			setTimeout(() => { this.data.signals.onSequenceStop.dispatch(); }, 350);
		} else {
			this.data.currentIndex += 1;
		}
	}

	addNewKey() {
		const key = this.game.rnd.integerInRange(1, this.store.totalKeys);
		this.data.signals.onNewKey.dispatch(key);

		return this;
	}

	compareSequence() {
		const { sequence, playerSequence } = this.store;
		const lastIndex = playerSequence.length - 1;

		if (playerSequence[lastIndex] === sequence[lastIndex]) {
			this.handlePlayerSuccess();
		} else {
			this.handlePlayerError();
		}

		return this;
	}

	nextLevel() {
		const { score } = this.store;

		if (score % 3 === 0) {
			this.switchSpots();
		} else {
			this.addNewKey();
		}
	}

	switchSpots() {
		const availableKeys = utils.shuffle([1, 2, 3, 4]); // TODO: refactor to match the value from the store
		const target = this.synthKeys[availableKeys.pop() - 1];
		const destination = this.synthKeys[availableKeys.shift() - 1];
		const duration = 350;
		const easing = Phaser.Easing.Cubic.InOut;
		const temp = {};

		const targetUp = this.game.add.tween(target);
		const targetDown = this.game.add.tween(target);
		const destinationUp = this.game.add.tween(destination);
		const destinationDown = this.game.add.tween(destination);

		temp.x = target.x;
		targetUp.to({ y: -this.game.height }, duration, easing, true).onComplete.add(() => target.x = destination.x, this);
		destinationDown.to({ y: this.game.height }, duration, easing, true).onComplete.add(() => destination.x = temp.x, this);

		targetDown.to({ y: 0 }, duration, easing, false);
		destinationUp.to({ y: 0 }, duration, easing, false);

		targetUp.chain(targetDown);
		destinationDown.chain(destinationUp);

		destinationUp.onComplete.add(this.addNewKey.bind(this));
	}

	handlePlayerSuccess() {
		if (this.store.sequence.length === this.store.playerSequence.length) {
			this.data.signals.onPlayerSuccess.dispatch();
			this.data.signals.onKeyDisable.dispatch();
			this.data.signals.onLevelUp.dispatch();

			setTimeout(this.nextLevel.bind(this), 1000);
		}
	}

	handlePlayerError() {
		this.data.signals.onPlayerError.dispatch();
		this.data.signals.onKeyDisable.dispatch();
		utils.shakeCamera(this.game, 0.03, 200, true, Phaser.Camera.SHAKE_HORIZONTAL);

		setTimeout(this.playSequence.bind(this), 1000);
	}

	handlePauseClick() {
		this.data.signals.onPauseStateChange.dispatch();
	}

	handleSoundClick() {
		this.data.signals.onSoundStateChange.dispatch();
	}

	handleSequenceStateChange(isSequencePlaying) {
		this.UI.toggleRec(isSequencePlaying);
	}

	handleGamePause() {
		this.pauseSequence();
	}

	handleGameResume() {
		this.resumeSequence();
	}

	pauseSequence() {
		this.data.sequenceTimer.pause();
	}

	resumeSequence() {
		this.data.sequenceTimer.resume();
	}

	restart() {
		// TODO: refactor, wtf?
		this.store.reset();
		this.UI.reset();
	}

	getSignals() {
		return this.data.signals;
	}
}
