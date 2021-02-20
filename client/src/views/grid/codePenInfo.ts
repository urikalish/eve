export interface CodePenInfo {
	url: string;
	avatar?: string;
	title?: string;
	color?: string;
}

export class CodePenInfoHelper {
	static getCodePenUser(cpi: CodePenInfo): string {
		const res = cpi.url.trim().match(/(?:codepen.io\/)(\S*)(?:\/pen\/)/);
		return (res && res[1]) || '';
	}
	static getCodePenId(cpi: CodePenInfo): string {
		const res = cpi.url.trim().match(/(?:\/pen\/)(\S*)/);
		return (res && res[1]) || '';
	}
	static getCodePenAvatar(cpi: CodePenInfo): string {
		return cpi.avatar || 'TestPilot';
	}
	static getCodePenTitle(cpi: CodePenInfo): string {
		return cpi.title || CodePenInfoHelper.getCodePenUser(cpi);
	}
	static getCodePenColor(cpi: CodePenInfo): string {
		return cpi.color || '#ccc';
	}
}
