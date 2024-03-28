import {
	Plugin
} from "obsidian";
import { getFormatDefinitionCmd, getFormatDefinitionSecondaryCmd } from "./commands";
import { SettingTab } from "./settings-tab";

interface PluginSettings {
	prefix_primary: string;
	prefix_secondary: string;
	suffix: string;
	prefixes_additional: string[];
}

const DEFAULT_SETTINGS: Partial<PluginSettings> = {
	prefix_primary: "- ",
	suffix: ":",
}

export default class DefinitionFormatShortcutPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();  

		this.addSettingTab(new SettingTab(this.app, this));

		this.addCommand(getFormatDefinitionCmd(this));
		this.addCommand(getFormatDefinitionSecondaryCmd(this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
