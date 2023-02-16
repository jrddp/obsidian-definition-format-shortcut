import {
	Plugin
} from "obsidian";
import { getFormatDefinitionCmd } from "./commands";
import { SettingTab } from "./settings-tab";

interface PluginSettings {
	prefix: string;
	suffix: string;
}

const DEFAULT_SETTINGS: Partial<PluginSettings> = {
	prefix: "- ",
	suffix: ":"
}

export default class DefinitionFormatShortcutPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();  

		this.addSettingTab(new SettingTab(this.app, this));

		this.addCommand(getFormatDefinitionCmd(this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
