export class TextHelper {
	static hack(txt: string, toLowerCase = false, spaceReplacer = ' '): string {
		let res = txt;
		if (toLowerCase) {
			res = res.toLowerCase();
		}
		res = res
			.replaceAll(/[Oo]/g, '0')
			.replaceAll(/[Ii]/g, '1')
			.replaceAll(/[Zz]/g, '2')
			.replaceAll(/[Ee]/g, '3')
			.replaceAll(/[Aa]/g, '4')
			.replaceAll(/[Ss]/g, '5')
			.replaceAll(/[b]/g, '6')
			.replaceAll(/[Tt]/g, '7')
			.replaceAll(/[B]/g, '8')
			.replaceAll(/[g]/g, '9');
		if (spaceReplacer !== undefined) {
			res = res.replaceAll(/[ ]/g, spaceReplacer);
		}
		return res;
	}
}
