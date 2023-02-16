import { Editor, EditorPosition, MarkdownView } from "obsidian";
import DefinitionFormatShortcutPlugin from "./main";
import { formatDefinition } from "./text-formatter";

export function getFormatDefinitionCmd(plugin: DefinitionFormatShortcutPlugin) {
  return {
			id: "format-definition",
			name: "Format definition",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(plugin);

				const lineNum = editor.getCursor().line;
				const lineText = editor.getLine(lineNum);
				const cursorChar = editor.getCursor().ch;

				// there is nothing to do at the start of the line
				if (cursorChar === 0) return;

				const textBeforeCursor = lineText.substring(0, cursorChar);

				editor.getCursor();
				const lineStart: EditorPosition = {
					ch: 0,
					line: lineNum,
				};

				editor.replaceRange(
					formatDefinition(textBeforeCursor, plugin.settings.prefix, plugin.settings.suffix),
					lineStart,
					editor.getCursor()
				);
			},
		}
}