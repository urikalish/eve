import { GridInfo } from './gridInfo';
import { CodePenInfo } from './codePenInfo';

export class LocalStorageHelper {
	static KEY_GRID = 'grid';

	static load(): GridInfo | null {
		const gridInfoStr = localStorage.getItem(`${LocalStorageHelper.KEY_GRID}`);
		if (!gridInfoStr) {
			return null;
		}
		try {
			return JSON.parse(gridInfoStr) as GridInfo;
		} catch {
			return null;
		}
	}

	static save(gridInfo: GridInfo): GridInfo {
		if (!gridInfo.id) {
			gridInfo.id = Date.now().toString();
		}
		localStorage.setItem(`${LocalStorageHelper.KEY_GRID}`, JSON.stringify(gridInfo));
		return gridInfo;
	}

	static updateAvatar(index: number, newAvatar: number): void {
		const gridInfo = LocalStorageHelper.load();
		if (!gridInfo) {
			return;
		}
		if (index >= 0 && index < gridInfo.codePens.length) {
			gridInfo.codePens[index].avatar = newAvatar;
		}
		LocalStorageHelper.save(gridInfo);
	}

	static getCodePenInfo(index: number): CodePenInfo | null {
		const gridInfo = LocalStorageHelper.load();
		if (!gridInfo) {
			return null;
		}
		return index >= 0 && index < gridInfo.codePens.length ? gridInfo.codePens[index] : null;
	}
}
