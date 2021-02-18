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
		];
	}
}
