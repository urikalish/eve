import { GridInfo } from './gridInfo';

export class Grids {
	static getGridInfo(id: string): GridInfo {
		return {
			id: '123',
			name: 'myGrid',
			codePens: [
				{
					url: 'https://codepen.io/urikalish/pen/yLVeGzq',
					title: 'gr33n_hack3r',
				},
				{
					url: 'https://codepen.io/urikalish/pen/RworEBK',
					title: 'y3ll0w_hack3r',
				},
				{
					url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
					title: 'r3d_hack3r',
				},
				{
					url: 'https://codepen.io/urikalish/pen/vYygjpz',
					title: 'blu3_hack3r',
				},
			],
		};
	}
}
