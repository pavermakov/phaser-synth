const switchState = function switchState(ctx, nextState, params) {
	ctx.state.start(nextState, true, false, params);
};

const fadeCamera = function fadeCamera(ctx, color, duration, callback) {
	ctx.camera.fade(color, duration);

	if (callback) {
		ctx.camera.onFadeComplete.addOnce(callback, ctx);
	}
};

const revealCamera = function revealCamera(ctx, color, duration, callback) {
	ctx.camera.flash(color, duration);

	if (callback) {
		ctx.camera.onFlashComplete.addOnce(callback, ctx);
	}
};

const isIphone4 = function isIphone4() {
	if (navigator && navigator.userAgent) {
		return /iPhone/i.test(navigator.userAgent) && window.screen.height === (960 / 2);
	}

	return false;
};

const isAndroidVersion = function isAndroidVersion(version) {
	if (navigator && navigator.userAgent) {
		const exp = `Android ${version}`;
		const re = new RegExp(exp, 'g');

		return re.test(navigator.userAgent);
	}

	return false;
};

const getResolution = function getResolution() {
	return window.devicePixelRatio >= 2.5 ? '@3x' : window.devicePixelRatio > 1.5 ? '@2x' : '';
};

export default {
	switchState,
	fadeCamera,
	revealCamera,
	isIphone4,
	isAndroidVersion,
	getResolution,
};
