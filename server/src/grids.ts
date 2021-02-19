import { GridInfo } from './gridInfo';

const grids: GridInfo[] = [
	{
		id: '123',
		name: 'myGrid',
		codePens: [
			{
				url: 'https://codepen.io/urikalish/pen/yLVeGzq',
				title: 'gr33n_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
				title: 'r3d_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/yLVeGzq',
				title: 'gr33n_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
				title: 'r3d_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/yLVeGzq',
				title: 'gr33n_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
				title: 'r3d_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/yLVeGzq',
				title: 'gr33n_hack3r',
			},
			{
				url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
				title: 'r3d_hack3r',
			},
		],
	},
];

export class Grids {
	static getGridInfo(id: string): GridInfo | null {
		return grids.find((g) => g.id === id) || null;
	}
}
