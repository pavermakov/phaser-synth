import Boot from './Boot/';
import Preload from './Preload/';
import Menu from './Menu/';
import Play from './Play/';

const states = [{
	key: 'Boot',
	state: Boot,
}, {
	key: 'Preload',
	state: Preload,
}, {
	key: 'Menu',
	state: Menu,
}, {
	key: 'Play',
	state: Play,
}];

export default states;
