```dataview
List rows.file.link FROM "books/notes/Example book" group by split(file.folder, "/")[length(split(file.folder, "/"))-1]
```