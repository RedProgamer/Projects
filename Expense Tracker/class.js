class Item {
    
    items = [];
    createItem(text, amt) {
        this.text = text;
        this.amt = amt;
    }

    addItem(text, amt) {
        if(this.validText(text) && this.validAmt(amt)) {
            const item = new this.createItem(text, amt);
            items.push(item);
        }else {
            alert('Enter valid inputs in fields');
        }
    }

    validText(text) {
        return text.trim().length > 0;
    }

    validAmt(amt) {
        return amt !== '';
    }
}