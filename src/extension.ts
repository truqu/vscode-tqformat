import * as vscode from 'vscode';
import child_process = require("child_process");

export function activate(context: vscode.ExtensionContext) {
	let outputChannel = vscode.window.createOutputChannel("TqFormat");

	vscode.languages.registerDocumentFormattingEditProvider("erlang", {
		provideDocumentFormattingEdits(
			document: vscode.TextDocument
		): Thenable<vscode.TextEdit[]> {
			return format(document, outputChannel);
		},
	});
}

export function deactivate() { }

function format(
	document: vscode.TextDocument,
	outputChannel: vscode.OutputChannel
): Promise<vscode.TextEdit[]> {
	return new Promise((resolve) => {
		const workspaceRootPath = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath;
		const args = ["format", document.fileName];

		outputChannel.appendLine(`Running: rebar3 ${args.join(" ")}`);
		const formatter = child_process.spawn("rebar3", args, { cwd: workspaceRootPath });

		formatter.on("error", (err) => { outputChannel.appendLine(err.message) });
		formatter.on("message", (msg) => { outputChannel.appendLine(msg) });
		formatter.stderr.on("data", (data) => { outputChannel.appendLine(data) });
		formatter.stdout.on("data", (data) => { outputChannel.appendLine(data) });

		resolve([]);
	});
}