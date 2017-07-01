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
	}

	_createKeys() {
		const keys = this.game.add.group();
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
			options.x = 40 * i;
			options.color = keyColors[i];
			options.id = i + 1;

			tempKey = new Key(this.game, options);

			this._addSynthKeySignals(tempKey);
			keys.add(tempKey);
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
}
