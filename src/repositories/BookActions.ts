import { App, Notice, TFile } from "obsidian";
import { NewBook } from "src/components/new_book";
import { searchBook } from "src/components/search_book";

export class BookActions {

    protected app: App;

    constructor(app: App) {
        this.app = app;
    }
    public createNewBook(bookDB: string, notesDir: string): void {
        new NewBook(app, (
            book
        ) => {
            const filtered_tags = book.tagsMax(book.tags)
            const bsearch = this.removeAccent(book.name_of_book.toLowerCase())
            let dir = `${notesDir}/${book.name_of_book}`

            let noteContent = '';

            if (book.notesDir) {
                noteContent = `
\`\`\`dataview
List rows.file.link FROM "${dir}" group by split(file.folder, "/")[length(split(file.folder, "/"))-1]
\`\`\`                
`
            }

            const bk = `---
name :: ${book.name_of_book}
book_search :: ${bsearch}
author :: ${book.author}
book_cover :: ${book.cover_link}
pages :: ${book.number_of_pages}
pages_read :: ${book.pages_read}
tags :: ${filtered_tags}
status :: ${book.status}
rating :: ${book.rating}
---

${noteContent}
`
            if (book.notesDir) {
                app.vault.createFolder(dir);
                app.vault.createFolder(`${dir}/chapter 1`);
                app.vault.create(`${dir}/chapter 1/file.md`, '').then(() => {
                    new Notice(`Folder was created`)
                }).catch(() => new Notice(`Could not create folder`))
            }
            app.vault.create(`${bookDB}/${book.name_of_book}.md`, bk).then(() => {
                new Notice(`The book ${book.name_of_book}, was created.`)
            }).catch(() => new Notice(`Could not create book`))
        }).open();
    }

    public searchBookDisplay(bookIndex: string): void {

        new searchBook(app, (
            query
        ) => {

            let File = this.app.vault.getAbstractFileByPath(`${bookIndex}.md`);
            console.log(File)
            if (File instanceof TFile) {
                this.app.fileManager.processFrontMatter(File, (frontMatter) => {
                    frontMatter["book_name"] = query.name_of_book.toLowerCase()
                })
            }
        }).open();
    }


    private removeAccent(str: string): string {
        str = str.toLowerCase();
        str = str.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        str = str.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        str = str.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        str = str.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        str = str.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        str = str.replace(new RegExp('[Ç]', 'gi'), 'c');
        return str;
    }
}