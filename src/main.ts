import { Notice, Plugin } from 'obsidian';
import { SampleSettingTab } from 'src/settingsTab'
import { BookActions } from 'src/repositories/BookActions'
import { MyPluginSettings } from './interfaces/ISettings';

const DEFAULT_SETTINGS: MyPluginSettings = {
	bookDatabase: 'books/books_db',
	bookIndex: 'books/My Books',
	notesDir: 'books/notes'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// Command to open modal to create new book
		this.addCommand({
			id: 'insert a new book',
			name: 'insert a new book',
			callback: () => {
				const bk = new BookActions(this.app);
				bk.createNewBook(this.settings.bookDatabase, this.settings.notesDir)
			}
		});

		// Command to search your books
		this.addCommand({
			id: 'Search book',
			name: 'Search your book',
			callback: () => {
				const bk = new BookActions(this.app);
				bk.searchBookDisplay(this.settings.bookIndex)
			}
		});
		
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
		new Notice('Thanks for using my plugin :)')
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

