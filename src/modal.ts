import { App, Modal, Setting } from "obsidian";

export class ExampleModal extends Modal {
  name_of_book: string;
  author: string;
  start_date: string;
  end_date: string;
  cover_link: string;
  number_of_pages: string;
  reading_pages: string;
  note: string

  onSubmit: (
    name_of_book: string,
    author: string,
    start_date: string,
    end_date: string,
    cover_link: string,
    number_of_pages: string,
    reading_pages: string,
    note: string
    ) => void;

  constructor(app: App, onSubmit: (
    name_of_book: string,
    author: string,
    start_date: string,
    end_date: string,
    cover_link: string,
    number_of_pages: string,
    reading_pages: string,
    note: string
  ) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl("h1", { text: "Insert a new book!" });

    new Setting(contentEl)
      .setName("Name of book")
      .addText((text) =>
        text.onChange((value) => {
          this.name_of_book = value
        }).setPlaceholder('Advanced Penetration Testing'));

    new Setting(contentEl)
    .setName("Author")
    .addText((text) =>
      text.onChange((value) => {
        this.author = value
      }).setPlaceholder('Wil Allsopp'));

    new Setting(contentEl)
    .setName("Start date")
    .addText((text) =>
      text.onChange((value) => {
        this.start_date = value
      }).setPlaceholder('10/12/2003'));

    new Setting(contentEl)
    .setName("End date")
    .addText((text) =>
      text.onChange((value) => {
        this.end_date = value
      }).setPlaceholder('22/01/2023'));
      
    new Setting(contentEl)
      .setName("Cover link")
      .addText((text) =>
        text.onChange((value) => {
          this.cover_link = value
        }).setPlaceholder('https://www.google.com/image.png'));

    new Setting(contentEl)
    .setName("Number of pages")
    .addText((text) =>
      text.onChange((value) => {
        this.number_of_pages = value
      }).setPlaceholder('288'));

    new Setting(contentEl)
    .setName("Reading pages")
    .addText((text) =>
      text.onChange((value) => {
        this.reading_pages = value
      }).setPlaceholder('23'));

    new Setting(contentEl)
    .setName("Note")
    .addText((text) =>
      text.onChange((value) => {
        this.note = value
      }).setPlaceholder('10'));

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(
              this.name_of_book,
              this.author,
              this.start_date,
              this.end_date,
              this.cover_link,
              this.number_of_pages,
              this.reading_pages,
              this.note,
            );
          }));
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}