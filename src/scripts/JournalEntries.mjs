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
        }
    }

    // Method to edit the entry not yet utalized but built for future.
    // editEntry(newTitle, newDate, newFirst, newLast, newContent) {
    //     this.title = newTitle || this.title;
    //     this.date = newDate || this.date;
    //     this.first = newFirst || this.first;
    //     this.last = newLast || this.last;
    //     this.content = newContent || this.content;
    // }
}