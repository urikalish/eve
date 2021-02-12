export interface CodePenInfo {
	url: string;
	title?: string;
	color?: string;
}

export class CodePens {
	static getCodePens(): CodePenInfo[] {
		return [
			{
				url: 'https://codepen.io/urikalish/pen/yLVeGzq',
				title: 'Green Hacker',
				color: '#0f0',
			},
			{
				url: 'https://codepen.io/urikalish/pen/RworEBK',
				title: 'Yellow Hacker',
				color: '#ff0',
			},
			{
				url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
				title: 'Red Hacker',
				color: '#f00',
			},
			{
				url: 'https://codepen.io/urikalish/pen/QWErXRe',
				title: 'Cyan Hacker',
				color: '#0ff',
			},
		];
	}
}
