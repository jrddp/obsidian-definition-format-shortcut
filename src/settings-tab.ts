import { App, PluginSettingTab, Setting } from "obsidian";
import DefinitionFormatShortcutPlugin from "./main";

export class SettingTab extends PluginSettingTab {
	plugin: DefinitionFormatShortcutPlugin;

	constructor(app: App, plugin: DefinitionFormatShortcutPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		// prefix setting
		new Setting(containerEl)
			.setName("Main Definition Prefix")
			.setDesc("Text to add before the defined term.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.prefix_primary)
					.onChange(async (value) => {
						this.plugin.settings.prefix_primary = value;
						await this.plugin.saveSettings();
					})
			);

		// prefix setting
		new Setting(containerEl)
			.setName("Secondary Definition Prefix")
			.setDesc("Text to add before the defined term.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.prefix_secondary)
					.onChange(async (value) => {
						this.plugin.settings.prefix_secondary = value;
						await this.plugin.saveSettings();
					})
			);

		// suffix setting
		new Setting(containerEl)
			.setName("Definition Delimiter")
			.setDesc("Text to add after the defined term.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.suffix)
					.onChange(async (value) => {
						this.plugin.settings.suffix = value;
						await this.plugin.saveSettings();
					})
			);

		// suffix setting
		new Setting(containerEl)
			.setName("Additional prefixes (Separated by |||)")
			.setDesc(
				"Prefixes that will be cycled through when using a shortcut multiple times."
			)
			.addText((text) =>
				text
					.setValue(
						this.plugin.settings.prefixes_additional.join("|||")
					)
					.onChange(async (value) => {
						this.plugin.settings.prefixes_additional =
							value.split("|||");
						await this.plugin.saveSettings();
					})
			);
	}
}
