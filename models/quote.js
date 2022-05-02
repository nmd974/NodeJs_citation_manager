class Quote {
    constructor(quote){
        this._validate(quote);
        this.quote = quote;
    }

    _validate(param){
        //Faire la validation de l'objet
    }
}

module.exports = Quote;