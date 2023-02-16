import {
	Plugin
} from "obsidian";
import { getFormatDefinitionCmd } from "./commands";

export default class DefinitionFormatShortcutPlugin extends Plugin {
	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand(getFormatDefinitionCmd());
	}

	onunload() {}
}
