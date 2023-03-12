---
book_name: ""
cssClass:
  - cards
  - cards-cols-4
  - cards-cover
  - user-snippet-full-width-note
  - image-full
  - banner-title
banner: "https://www.xtrafondos.com/wallpapers/resoluciones/21/habitacion-lofi_1280x720_8943.jpg"
banner_y: 0.8
---

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
" + round((pages_read/pages) * 100) + "% Completed" AS Pg
FROM "books/books_db"
WHERE contains(book_search, this.file.frontmatter.book_name)
```

### Books DB
```dataview
TABLE WITHOUT ID
("![|300x270](" + book_cover + ")") as Cover,
file.link As "Name",
rating as Rating,
"✍️" + author as Author,
teste as Tag,
"📖 - " +status as Status,
"<progress value=" + pages_read + " max=" + pages + "></progress>
" + round((pages_read/pages) * 100) + "% Completed" AS Pg

FROM "books/books_db"
```