import { GridInfo } from './gridInfo';

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

	static updateAvatar(url: string, newAvatar: number): void {
		const gridInfo = LocalStorageHelper.load();
		if (!gridInfo) {
			return;
		}
		const codePens = gridInfo.codePens.filter((cpi) => cpi.url === url);
		codePens.forEach((cp) => {
			cp.avatar = newAvatar;
		});
		LocalStorageHelper.save(gridInfo);
	}
}
