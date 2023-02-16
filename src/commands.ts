import { Editor, EditorPosition, MarkdownView } from "obsidian";
import { formatDefinition } from "./text-formatter";

export function getFormatDefinitionCmd() {
  return {
			id: "format-definition",
			name: "Format definition",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				const lineNum = editor.getCursor().line;
				const lineText = editor.getLine(lineNum);
				const cursorChar = editor.getCursor().ch;

				// there is nothing to do at the start of the line
				if (cursorChar === 0) return;

				const pre = lineText.substring(0, cursorChar);

				editor.getCursor();
				const lineStart: EditorPosition = {
					ch: 0,
					line: lineNum,
				};

				editor.replaceRange(
					formatDefinition(pre),
					lineStart,
					editor.getCursor()
				);
			},
		}
}