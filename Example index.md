---
book_name: asdadda
cssClass:
- cards
- cards-col-3
- cards-cover
---

### Pesquise aqui seu livro
```dataview
TABLE WITHOUT ID
("![|300x270](" + book_cover + ")") as Cover,
file.link As "Name",
book_search as Rating,
"✍️" + author as Author,
tags as Tag,
"📖 - " +status as Status,
"<progress value=" + pages_read + " max=" + pages + "></progress>
" + round((pages_read/pages) * 100) + "   % Completed" AS Pg
FROM "books/books_db"
WHERE contains(book_search, this.file.frontmatter.book_name)
```

### Books
```dataview
TABLE WITHOUT ID
("![|300x270](" + book_cover + ")") as Cover,
file.link As "Name",
rating as Rating,
"✍️" + author as Author,
tags as Tag,
"📖 - " +status as Status,
"<progress value=" + pages_read + " max=" + pages + "></progress>
" + round((pages_read/pages) * 100) + "   % Completed" AS Pg
FROM "books/books_db"
```