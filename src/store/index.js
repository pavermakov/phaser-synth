class Store {
	constructor(game) {
		this.game = game;

		this.init();
	}

	init() {
		this._initStates();
		this._initData();
	}

	_initStates() {
		this.states = this.game.state.states;
	}

	_initData() {
		this.totalKeys = 4;
		this.keyColors = [0x421964, 0x18D5EE, 0xBA1D50, 0xB7A4CC];

		this.sequence = [1, 2, 3, 4];
	}
}

export default Store;
