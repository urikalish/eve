import { AvatarHelper } from './avatarHelper';

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
		if (!cpi.avatar) {
			cpi.avatar = AvatarHelper.getRandomAvatar();
		}
		return cpi.avatar;
	}
	static getCodePenTitle(cpi: CodePenInfo): string {
		return cpi.title || CodePenInfoHelper.getCodePenUser(cpi);
	}
	static getCodePenColor(cpi: CodePenInfo): string {
		return cpi.color || '#ccc';
	}
}
