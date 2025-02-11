export default class JournalEntries {
    constructor(title, date, first, last, content) {
        this.title = title;
        this.date = date;
        this.first = first;
        this.last = last;
        this.content = content;
    }

    toJson() {
        return {
            title: this.title,
            date: this.date,
            first: this.first,
            last: this.last,
            content: this.content
        };
    }
}