import Phaser from 'phaser';
import Plank from './Plank';
import Life from './Life';
import { store } from '../store/';

class UI {
	constructor(game) {
		this.game = game;
		this.store = store;

		this.init();
	}

	init() {
		this.initPlanks()
				.initLives();
	}

	initPlanks() {
		this.plankColor = 0x0F0909;
		this.separatorColor = 0xC74343;
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

	initLives() {
		const { totalLives } = this.store;
		const gap = 40;
		let life = null;
		let i = null;

		this.lives = this.game.add.group();

		const options = {
			id: null,
			x: null,
			y: this.bottomPlank.centerY,
			key: 'heart',
			anchor: {
				x: 0.5,
				y: 0.5,
			},
			scale: {
				x: 0.5,
				y: 0.5,
			},
		};

		for (i = 0; i < totalLives; i += 1) {
			options.id = i;
			options.x = i * gap;

			life = new Life(this.game, options);
			this.lives.add(life);
		}

		this.lives.centerX = this.game.world.centerX;
	}
}

export default UI;
