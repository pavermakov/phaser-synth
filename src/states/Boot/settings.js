import Phaser from 'phaser';

const settings = {
	transparent: true,
	maxPointers: 2,
	roundPixels: true,
	forceSingleUpdate: false, // необходимо проверить на fps, и лишь потом сделать вывод
	disableVisibilityChange: true,
	scaleMode: Phaser.ScaleManager.SHOW_ALL,
	advancedTiming: true,
};

export const setFSU = function setFSU(value) {
	if (value && typeof value === 'boolean') {
		settings.forceSingleUpdate = value;
	} else {
		throw new Error('Incorrect argument type. Must be boolean');
	}
};

export default settings;
