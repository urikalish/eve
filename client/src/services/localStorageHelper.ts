import { GridInfo } from '../views/grid/gridInfo';

export class LocalStorageHelper {
	static KEY_GRID = 'grid';

	static loadFromStorage(): GridInfo | null {
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

	static saveToStorage(gridInfo: GridInfo): GridInfo {
		if (!gridInfo.id) {
			gridInfo.id = Date.now().toString();
		}
		localStorage.setItem(`${LocalStorageHelper.KEY_GRID}`, JSON.stringify(gridInfo));
		return gridInfo;
	}
}
