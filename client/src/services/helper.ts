export class Helper {
	static loadCodePenScript(): void {
		const script = document.createElement('script');
		script.setAttribute('id', 'codePenEmbedScript');
		script.setAttribute('async', '""');
		script.setAttribute('src', 'https://cpwebassets.codepen.io/assets/embed/ei.js');
		document.body.appendChild(script);
	}
}
