const path = require('path');
const fs = require('fs');

module.exports = class Quote {
    static pathToFile = path.join(path.dirname(process.mainModule.filename), '..', 'data', 'quotesDb.json');

    constructor(quoteDate, quoteValue, quoteFile) {
        this.quoteDate = quoteDate;
        this.quoteValue = quoteValue;
    }

    static fetchAll() {
        return fs.readFileSync(Quote.pathToFile);
    }

    save() {
        let quotesData = JSON.parse(Quote.fetchAll().toString());
        let series = quotesData.series;
        series.push(this);

        series.sort((l, r) =>
            new Date(l.quoteDate) - new Date(r.quoteDate)
        );

        fs.writeFile(Quote.pathToFile, JSON.stringify({name: quotesData.name, series: series}), (err) => {
            console.log(err);
        });
    }

    update() {
        let quotesData = JSON.parse(Quote.fetchAll().toString());
        let series = quotesData.series;
        let found = series.find(r => r.quoteDate === this.quoteDate);
        if (found !== undefined)
            found.quoteValue = this.quoteValue;
        else
            this.save();

        fs.writeFile(Quote.pathToFile, JSON.stringify({name: quotesData.name, series: series}), (err) => {
            console.log(err);
        });
    }

    static delete(quoteDate) {
        let quotesData = JSON.parse(Quote.fetchAll().toString());
        let series = quotesData.series;
        let index = series.findIndex(r => r.quoteDate === quoteDate);
        if (index !== -1) {
            series.splice(index, 1);

            fs.writeFile(Quote.pathToFile, JSON.stringify({name: quotesData.name, series: series}), (err) => {
                console.log(err);
            });
        }
    }
}