export class AvatarHelper {
	static getAllAvatars(shuffle: boolean): string[] {
		const NUM_OF_AVATARS = 150;
		const avatars = [];
		for (let i = 0; i < NUM_OF_AVATARS; i++) {
			let name = 'a';
			if (i < 10) {
				name += '00';
			} else if (i < 100) {
				name += '0';
			}
			name += i.toString();
			avatars.push(name);
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

	static getRandomAvatar(): string {
		const allAvatars = AvatarHelper.getAllAvatars(false);
		return allAvatars[Math.trunc(Math.random() * allAvatars.length)];
	}
}
