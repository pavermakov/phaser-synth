import Phaser from 'phaser';
import Plank from './Plank';
import Life from './Life';
import Score from './Score';
import Timer from './Timer';
import PauseToggler from './PauseToggler';
import SoundToggler from './SoundToggler';
import { store } from '../store/';

class UI {
	constructor(game) {
		this.game = game;
		this.store = store;

		this.init();
	}

	init() {
		this.initData()
				.initSignals()
				.initPlanks()
				.initSoundToggler()
				.initPauseToggler()
				.initLives()
				.initScore()
				.initTimer();
	}

	initData() {
		this.data = {
			padding: 20,
			iconsMarginBottom: 3,
			scoreTemplate: 'SCORE:',
			signals: {
				onPauseClick: new Phaser.Signal(),
				onSoundClick: new Phaser.Signal(),
			},
		};

		return this;
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

	initPauseToggler() {
		const options = {
			x: this.game.world.width - this.data.padding,
			y: this.topPlank.centerY - this.data.iconsMarginBottom,
			key: 'icons',
			callback: this.handlePauseClick,
			callbackContext: this,
			frame: 2,
			anchor: {
				x: 1,
				y: 0.5,
			},
			uiSignals: this.data.signals,
		};

		this.pauseToggler = new PauseToggler(this.game, options);

		return this;
	}

	initSoundToggler() {
		const options = {
			x: this.data.padding,
			y: this.topPlank.centerY - this.data.iconsMarginBottom,
			key: 'icons',
			callback: this.handleSoundClick,
			callbackContext: this,
			frame: 0,
			anchor: {
				x: 0,
				y: 0.5,
			},
			uiSignals: this.data.signals,
		};

		this.soundToggler = new SoundToggler(this.game, options);

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
				x: 0,
				y: 0.5,
			},
			scale: {
				x: 0.5,
				y: 0.5,
			},
		};

		for (i = 0; i < totalLives; i += 1) {
			options.id = i;
			options.x = (i * gap) + this.data.padding;

			life = new Life(this.game, options);
			this.lives.add(life);
		}

		return this;
	}

	initScore() {
		const options = {
			x: this.game.width - this.data.padding,
			y: this.bottomPlank.centerY,
			text: `${this.data.scoreTemplate} ${this.store.score}`,
			style: {
				font: 'bold 20px Quicksand',
				fill: 'white',
			},
			anchor: {
				x: 1,
				y: 0.5,
			},
		};

		this.score = new Score(this.game, options);

		return this;
	}

	initTimer() {
		const options = {
			x: this.game.world.centerX,
			y: this.topPlank.centerY,
			text: '00:00',
			style: {
				font: 'bold 20px Quicksand',
				fill: 'white',
			},
			anchor: {
				x: 0.5,
				y: 0.5,
			},
		};

		this.timer = new Timer(this.game, options);

		return this;
	}

	initSignals() {
		const { onLivesDecreased, onScoreIncreased } = this.store.getSignals();
		const { onPlayStateReady } = this.game.state.states.Play.getSignals();

		onPlayStateReady.add(this.startTimer, this);
		onLivesDecreased.add(this.removeLife, this);
		onScoreIncreased.add(this.updateScore, this);

		return this;
	}

	startTimer() {
		this.timer.start();
	}

	updateScore(score) {
		this.score.setText(`${this.data.scoreTemplate} ${score}`);
	}

	removeLife() {
		if (this.lives.length <= 0) return;

		this.lives.getAt(this.lives.length - 1).destroy();
	}

	handlePauseClick() {
		this.data.signals.onPauseClick.dispatch();
	}

	handleSoundClick() {
		this.data.signals.onSoundClick.dispatch();
	}

	getSignals() {
		return this.data.signals;
	}
}

export default UI;
