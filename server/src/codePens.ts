export interface CodePenInfo {
	title: string;
	color?: string;
	cpUser: string;
	cpId: string;
}

export class CodePens {
	static getCodePens(): CodePenInfo[] {
		return [
			{
				title: 'Green Hacker',
				color: '#0f0',
				cpUser: 'urikalish',
				cpId: 'yLVeGzq',
			},
			{
				title: 'Yellow Hacker',
				color: '#ff0',
				cpUser: 'urikalish',
				cpId: 'RworEBK',
			},
			{
				title: 'Red Hacker',
				color: '#f00',
				cpUser: 'urikalish',
				cpId: 'ZEBGVVY',
			},
			{
				title: 'Cyan Hacker',
				color: '#0ff',
				cpUser: 'urikalish',
				cpId: 'QWErXRe',
			},
		];
	}
}
