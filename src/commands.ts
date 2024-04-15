import { Editor, EditorPosition, MarkdownView } from "obsidian";
import DefinitionFormatShortcutPlugin from "./main";
import { formatDefinition } from "./text-formatter";

let lastLineNum: number | null = null;
let lastLineTextUnformatted: string | null = null;
let lastLineTextFormatted: string | null = null;
let lastCursorChar: number | null = null;
let lastPrefixIdx = 0;
let cycleIndex = 1;

function getFullPrefixList(plugin: DefinitionFormatShortcutPlugin) {
	const list = [];
	if (plugin.settings.prefix_primary)
		list.push(plugin.settings.prefix_primary);
	if (plugin.settings.prefixes_additional)
		list.push(...plugin.settings.prefixes_additional);
	return list;
}

function shouldCycle(editor: Editor) {
	const lineNum = editor.getCursor().line;
	const lineText = editor.getLine(lineNum);
	const cursorChar = editor.getCursor().ch;
}

export function getFormatDefinitionCmd(plugin: DefinitionFormatShortcutPlugin) {
	return {
		id: "format-definition-primary",
		name: "Format definition (Primary)",
		editorCallback: (editor: Editor, view: MarkdownView) => {
			const lineNum = editor.getCursor().line;
			const lineText = editor.getLine(lineNum);
			const cursorChar = editor.getCursor().ch;

			// there is nothing to do at the start of the line
			if (cursorChar === 0) return;

			let textBeforeCursor = lineText.substring(0, cursorChar);

			let prefix = plugin.settings.prefix_primary;
			let prefixIdx = 0;
			let isRepeat = false;
			if (
				lineNum == lastLineNum &&
				lineText == lastLineTextFormatted &&
				lastCursorChar == cursorChar
			) {
				// cycle through the prefixes
				const prefixes = getFullPrefixList(plugin);
				prefixIdx = (lastPrefixIdx + 1) % prefixes.length;
				cycleIndex = prefixIdx > 0 ? prefixIdx : 1;
				prefix = prefixes[prefixIdx];
				textBeforeCursor = lastLineTextUnformatted!.substring(
					0,
					lastCursorChar
				);
				isRepeat = true;
			}

			const lineStart: EditorPosition = {
				ch: 0,
				line: lineNum,
			};

			editor.replaceRange(
				formatDefinition(
					textBeforeCursor,
					prefix,
					plugin.settings.suffix
				),
				lineStart,
				editor.getCursor()
			);

			lastLineNum = editor.getCursor().line;
			if (!isRepeat) lastLineTextUnformatted = lineText;
			lastLineTextFormatted = editor.getLine(lastLineNum);
			lastCursorChar = editor.getCursor().ch;
			lastPrefixIdx = prefixIdx;
		},
	};
}

export function getFormatDefinitionSecondaryCmd(
	plugin: DefinitionFormatShortcutPlugin
) {
	return {
		id: "format-definition-secondary",
		name: "Format definition (Secondary)",
		editorCallback: (editor: Editor, view: MarkdownView) => {
			const lineNum = editor.getCursor().line;
			const lineText = editor.getLine(lineNum);
			const cursorChar = editor.getCursor().ch;

			const prefixes = getFullPrefixList(plugin);

			// there is nothing to do at the start of the line
			if (cursorChar === 0) return;

			let textBeforeCursor = lineText.substring(0, cursorChar);

			let prefix = prefixes.length == 1 ? prefixes[0] : prefixes[cycleIndex];
			let prefixIdx = 1;
			let isRepeat = false;
			if (
				lineNum == lastLineNum &&
				lineText == lastLineTextFormatted &&
				lastCursorChar == cursorChar
			) {
				prefixIdx =
					(prefixes.length + (lastPrefixIdx - 1)) % prefixes.length;
				cycleIndex = prefixIdx == 0 ? prefixIdx : 1;
				prefix = prefixes[prefixIdx];
				textBeforeCursor = lastLineTextUnformatted!.substring(
					0,
					lastCursorChar
				);
				isRepeat = true;
			}

			const lineStart: EditorPosition = {
				ch: 0,
				line: lineNum,
			};

			editor.replaceRange(
				formatDefinition(
					textBeforeCursor,
					prefix,
					plugin.settings.suffix
				),
				lineStart,
				editor.getCursor()
			);

			lastLineNum = editor.getCursor().line;
			if (!isRepeat) lastLineTextUnformatted = lineText;
			lastLineTextFormatted = editor.getLine(lastLineNum);
			lastCursorChar = editor.getCursor().ch;
			lastPrefixIdx = prefixIdx;
		},
	};
}
