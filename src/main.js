import Phaser from 'phaser';
import states from './states/';
import config from './config/';
import utils from './utils/';

class Game extends Phaser.Game {
	constructor({ size, renderer, parent, antialias }) {
		super(size.width, size.height, renderer, parent, null, false, antialias);

		this.init();
	}

	init() {
		this._initStates();
		this._nextState();
	}

	_initStates() {
		states.forEach(this._addState.bind(this));
	}

	_addState({ key, state }) {
		const newState = this.state.add(key, state);

		if (!newState.onStateReady) {
			newState.onStateReady = new Phaser.Signal();
		}
	}

	_nextState() {
		utils.switchState(this, 'Boot');
	}
}

window.game = new Game(config);
