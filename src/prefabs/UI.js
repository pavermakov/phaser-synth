import Phaser from 'phaser';
import Plank from './Plank';

class UI {
	constructor(game) {
		this.game = game;

		this.init();
	}

	init() {
		this.initPlanks();
	}

	initPlanks() {
		this.plankColor = 0x0F0909;
		this.separatorColor = 0xff5beb;
		this.plankHeight = 50;
		this.separatorWidth = 5;

		this.createTopPlank();
		this.createBottomPlank();

		return this;
	}

	createTopPlank() {
		const options = {
			x: 0,
			y: 0,
			width: this.game.width,
			height: this.plankHeight,
			color: this.plankColor,
			separatorColor: this.separatorColor,
			separatorWidth: this.separatorWidth,
			isTop: true,
		};

		this.topPlank = new Plank(this.game, options);

		return this;
	}

	createBottomPlank() {
		const options = {
			x: 0,
			y: 0,
			width: this.game.width,
			height: this.plankHeight,
			color: this.plankColor,
			separatorColor: this.separatorColor,
			separatorWidth: this.separatorWidth,
		};

		this.bottomPlank = new Plank(this.game, options);
		this.bottomPlank.bottom = this.game.height + this.separatorWidth;

		return this;
	}
}

export default UI;
