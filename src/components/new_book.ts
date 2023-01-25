import { App, DropdownComponent, Modal, Setting } from "obsidian";
import { Book } from 'src/models/book';

export class NewBook extends Modal {
  book : Book;

  onSubmit: (
    book : Book,
    ) => void;

  constructor(app: App, onSubmit: (
    book : Book
  ) => void) {
    super(app);
    this.onSubmit = onSubmit;
    this.book = new Book();
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h1", { text: "Insert a new book!" });

    new Setting(contentEl)
      .setName("Name of book")
      .addText((text) =>
        text.onChange((value) => {
          this.book.name_of_book = value
        }).setPlaceholder('Advanced Penetration Testing'));

    new Setting(contentEl)
    .setName("Author")
    .addText((text) =>
      text.onChange((value) => {
        this.book.author = value
      }).setPlaceholder('Wil Allsopp'));

    new Setting(contentEl)
      .setName("Cover link")
      .addText((text) =>
        text.onChange((value) => {
          this.book.cover_link = value
        }).setPlaceholder('https://www.google.com/image.png'));

    new Setting(contentEl)
    .setName("Number of pages")
    .addText((text) =>
      text.onChange((value) => {
        this.book.number_of_pages = value
      }).setPlaceholder('288'));

    new Setting(contentEl)
    .setName("Pages read")
    .addText((text) =>
      text.onChange((value) => {
        this.book.pages_read = value
      }).setPlaceholder('23'));

    new Setting(contentEl)
      .setName("Tags (max 3)")
      .addText((text) =>
        text.onChange((value) => {
          this.book.tags = value
        }).setPlaceholder('#tag1 #tag2 #tag3'));

    new Setting(contentEl)
        .setName("Status")
        .addDropdown((component : DropdownComponent) => {
          component.addOption('', "Select book status");
          component.addOption('Completed', "Completed");
          component.addOption('Reading', "Reading");
          component.addOption('Not read', 'Not read');

          component.onChange((value) => {
            this.book.status = value
          })
        })

    new Setting(contentEl)
      .setName("Rating")
      .addDropdown((component : DropdownComponent) => {
        component.addOption('', "Select your rating");
        component.addOption('⭐', "⭐");
        component.addOption('⭐⭐', "⭐⭐");
        component.addOption('⭐⭐⭐', "⭐⭐⭐");
        component.addOption('⭐⭐⭐⭐', "⭐⭐⭐⭐");
        component.addOption('⭐⭐⭐⭐⭐', "⭐⭐⭐⭐⭐");

        component.onChange((value) => {
          this.book.rating = value
        })
      })
        
    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(
              this.book
            );
          }));
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}