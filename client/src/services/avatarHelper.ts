const NUM_OF_AVATARS = 150;

export class AvatarHelper {
	static getAllAvatars(shuffle: boolean): number[] {
		const avatars = [];
		for (let i = 0; i < NUM_OF_AVATARS; i++) {
			avatars.push(i);
		}
		if (!shuffle) {
			return avatars;
		}
		let ind = avatars.length,
			tempVal,
			randInd;
		while (0 !== ind) {
			randInd = Math.floor(Math.random() * ind);
			ind -= 1;
			tempVal = avatars[ind];
			avatars[ind] = avatars[randInd];
			avatars[randInd] = tempVal;
		}
		return avatars;
	}

	static getRandomAvatar(): number {
		return Math.trunc(Math.random() * NUM_OF_AVATARS);
	}

	static getAvatarFilePath(avatar: number): string {
		let prefix = '';
		if (avatar < 10) {
			prefix += '00';
		} else if (avatar < 100) {
			prefix += '0';
		}
		return `/img/avatars/a${prefix}${avatar}.jpg`;
	}
}
