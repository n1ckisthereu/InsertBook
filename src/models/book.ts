export class Book {
    constructor(
        name_of_book: string = 'Example book',
        author: string = 'Undefined author ',
        cover_link: string = 'https://pbs.twimg.com/media/EuONd87XAAE0bHg.jpg:large',
        number_of_pages: string = '100',
        pages_read: string = '10',
        tags: string = '#tag1 #tag2 #tag3',
        status: string = 'Reading',
        rating: string = '⭐'
    ){   
        this.name_of_book = name_of_book;
        this.book_search = name_of_book
        this.author = author;
        this.cover_link = cover_link;
        this.number_of_pages = number_of_pages;
        this.pages_read = pages_read;
        this.tags = tags;
        this.status = status;
        this.rating = rating;
    }
    name_of_book: string;
    book_search: string

    author: string;
    cover_link: string;
    number_of_pages: string;
    pages_read: string;
    tags: string;
    status: string
    rating: string


    public tagsMax(tags:string): string {
        let tagsSplitted = tags.split(' ');
        return tagsSplitted.slice(0, 3).join(' ');
    }   
}
