import Phaser from 'phaser';
import Key from '../../prefabs/Key';

export default class extends Phaser.State {
	init() {
		this.Store = window.game.Store;
		this.game = this.Store.game;
		this.world = this.game.world;
	}

	create() {
		this.synthKeys = this._createKeys();

		this._playSequence();
	}

	_createKeys() {
		const keys = [];
		const { totalKeys, keyColors } = this.Store;

		let tempKey = null;
		let i = null;

		const options = {
			id: null,
			x: null,
			y: 0,
			width: this.world.width / totalKeys,
			height: this.world.height,
			color: null,
		};

		for (i = 0; i < totalKeys; i += 1) {
			options.x = options.width * i;
			options.color = keyColors[i];
			options.id = i + 1;

			tempKey = new Key(this.game, options);

			this._addSynthKeySignals(tempKey);
			keys.push(tempKey);
		}

		return keys;
	}

	_addSynthKeySignals(key) {
		const { tapSignal } = key.getSignals();
		tapSignal.add(this._processTap, this);
	}

	_processTap(id) {
		console.log(`You tapped a key with id ${id}`);
	}

	_playSequence() {
		const { sequence } = this.Store;
		const interval = 200;
		let i = null;

		// turn off key input

		for (i = 0; i < sequence.length; i += 1) {
			setTimeout(this._activateSynthKey.bind(this, sequence, i), interval * i);
		}
	}

	_activateSynthKey(sequence, i) {
		this.synthKeys[sequence[i] - 1].activate(true);
	}
}
