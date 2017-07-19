import Phaser from 'phaser';
import Key from '../../prefabs/Key';
import UI from '../../prefabs/UI';
import { store } from '../../store/';
import utils from '../../utils/';

export default class extends Phaser.State {
	init() {
		this.store = store;
		this.game = this.store.game;
		this.world = this.game.world;

		this.initData();
		this.initSignals();
	}

	create() {
		this.synthKeys = this.createKeys();
		this.UI = this.createUI();

		this.start();
	}

	initData() {
		this.data = {
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
			},
		};

		return this;
	}

	initSignals() {
		const { onNewKeyPushed, onNewPlayerKeyPushed } = this.store.getSignals();

		onNewKeyPushed.add(this.playSequence, this);
		onNewPlayerKeyPushed.add(this.compareSequence, this);

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
		const { onPauseClick, onSoundClick } = ui.getSignals();

		onPauseClick.add(this.handlePauseClick, this);
		onSoundClick.add(this.handleSoundClick, this);

		return ui;
	}

	processTap(id) {
		this.data.signals.onNewPlayerKey.dispatch(id);
	}

	playSequence() {
		const { sequence, sequenceInterval } = this.store;
		let i = null;

		this.data.signals.onKeyDisable.dispatch();

		for (i = 0; i < sequence.length; i += 1) {
			if (i < sequence.length) {
				setTimeout(this.activateSynthKey.bind(this, sequence, i), sequenceInterval * i);
			}
		}
	}

	activateSynthKey(sequence, i) {
		this.data.signals.onKeyActive.dispatch(sequence[i], true);

		if (i === sequence.length - 1) {
			this.data.signals.onKeyEnable.dispatch();
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

	handlePlayerSuccess() {
		if (this.store.sequence.length === this.store.playerSequence.length) {
			this.data.signals.onPlayerSuccess.dispatch();
			this.data.signals.onKeyDisable.dispatch();
			this.data.signals.onLevelUp.dispatch();

			setTimeout(this.addNewKey.bind(this), 1000);
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

	getSignals() {
		return this.data.signals;
	}
}
