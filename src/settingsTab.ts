import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export class SampleSettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for plugin, define your directory database.' });

        new Setting(containerEl)
            .setName('Directory of books')
            .setDesc('define your directory database.')
            .addText(text => text
                .setPlaceholder('Enter your path to storage')
                .setValue(this.plugin.settings.bookDatabase)
                .onChange(async (value) => {
                    this.plugin.settings.bookDatabase = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Index of your books')
            .setDesc('set your book indexer')
            .addText(text => text
                .setPlaceholder('Enter your path to your indexer')
                .setValue(this.plugin.settings.bookIndex)
                .onChange(async (value) => {
                    this.plugin.settings.bookIndex = value;
                    await this.plugin.saveSettings();
                }));
    }
}
