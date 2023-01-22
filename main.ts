import { App, Plugin, Notice, PluginSettingTab, Setting } from 'obsidian';
import { ExampleModal } from "./src/modal";

interface MyPluginSettings {
	bookDatabase: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	bookDatabase: 'books'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'insert a new book',
			name: 'insert a new book',
			callback: () => {
				new ExampleModal(this.app, (
					name_of_book,
					author,
					start_date,
					end_date,
					cover_link,
					number_of_pages,
					reading_pages,
					note
				) => {
					if (
						name_of_book == undefined &&
						author == undefined &&
						start_date == undefined &&
						end_date == undefined &&
						cover_link == undefined &&
						number_of_pages == undefined &&
						reading_pages == undefined &&
						note == undefined
					) {
						new Notice(`Fill in the fields!`)
					} else {
						const book = `---
Name: ${name_of_book}
Author: ${author}
Start date: ${start_date}
End date: ${end_date}
Cover Link: ${cover_link}
Number of pages: ${number_of_pages} 
Reading pages: ${reading_pages}
Note: ${note}
---
`
						this.app.vault.create(`${this.settings.bookDatabase}/${name_of_book}.md`, book)

						new Notice(`The book ${name_of_book}, was created.`)
					}
				}).open();
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
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
	}
}
