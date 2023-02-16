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
      .setName("Definition Prefix")
      .setDesc("Text to add before the defined term.")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.prefix)
          .onChange(async (value) => {
            this.plugin.settings.prefix = value;
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
  }
}