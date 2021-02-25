export class CodePenScriptHelper {
	static appendScript(): void {
		const CODEPEN_EMBED_SCRIPT_ID = 'codePenEmbedScript';
		let script = document.getElementById(CODEPEN_EMBED_SCRIPT_ID);
		if (script) {
			script.remove();
		}
		script = document.createElement('script');
		script.setAttribute('id', CODEPEN_EMBED_SCRIPT_ID);
		script.setAttribute('async', '""');
		script.setAttribute('src', 'https://cpwebassets.codepen.io/assets/embed/ei.js');
		document.body.appendChild(script);
	}
}
