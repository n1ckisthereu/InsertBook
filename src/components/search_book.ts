import { App, Modal, Setting } from "obsidian";
import { SearchBook } from "src/models/search_book";

export class searchBook extends Modal {
    sb: SearchBook;

    onSubmit: (
        sb: SearchBook,
    ) => void;

    constructor(app: App, onSubmit: (
        sb: SearchBook
    ) => void) {
        super(app);
        this.onSubmit = onSubmit;
        this.sb = new SearchBook();
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h1", { text: "Search your book!" });

        new Setting(contentEl)
            .setName("Name of book")
            .addText((text) =>
                text.onChange((value) => {
                    this.sb.name_of_book = value
                }).setPlaceholder('Advanced Pen...'));

        new Setting(contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText("Submit")
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(
                            this.sb
                        );
                    }));
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}