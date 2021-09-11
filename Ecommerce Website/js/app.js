const cart_row = document.querySelector('.cart-row');
const cart_items = document.querySelector('.cart-items');
const total_price = document.querySelector('.cart-total-price');
const shop_items = document.querySelectorAll('.shop-items');
const scroller = document.querySelectorAll('#quantity');

const itemCtrl = (function(){
    const data = {
        item: [
            {id: 1, title: 'T-Shirt', img: './images/Shirt.png', price: 19.99, quantity: 1},
            {id: 2, title: 'Coffee Cup', img: './images/Cofee.png', price: 6.99, quantity: 1}
        ],
        totalPrice: 0.0,
    }

    return {
        getItems: function() {
            return data.item;
        },

        getLatestId: function() {
            return data.item.length <= 0 ? 0 : data.item[data.item.length - 1].id + 1;
        },

        getTotalPrice: function() {
            let total = 0.0;
            data.item.forEach(function(item) {
                total += item.price*item.quantity;
            });

            data.totalPrice = total.toFixed(2);
            return data.totalPrice;
        },

        getItemById: function(id) {
            let idx = data.item.map(function(item){
                return item.id;
            });

            return idx.indexOf(id);
        },

        addNewItem(title, imgSource, price, quantity) {
            const ID = this.getLatestId();
            const obj = {id: ID, title, img: imgSource, price: price, quantity};
    
            data.item.push(obj);
            return obj;
        },

        alreadyExistingItem: function(title) {
            data.item.forEach(function(item) {
                if(item.title === title)
                    return true;
            });
            return false;
        },

        removeItemById(id) {
            data.item.splice(id, 1);
        },

        changeItemQuantity(idx, qnt) {
            data.item[idx].quantity = qnt;
        },
    }
})();

const uiCtrl = (function() {
    return {
        showTotalPrice: function(totalPrice) {
            total_price.textContent = `$${totalPrice}`;
        },

        showAllItems: function(items) {
            let output = "";

            // Loop over each items and store them in a string
            items.forEach(function(item) {
                output += `<div class="cart-row" id="item-${item.id}">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${item.img}" width="100" height="100">
                        <span class="cart-item-title">${item.title}</span>
                    </div>
                    <span class="cart-price cart-column">$${item.price}</span>
                    <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1" min="1" max="50">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>
                </div>`;
            });

            cart_items.innerHTML = output;
        },

        addListItem: function(item) {
            const div = document.createElement('div');
            div.className = 'cart-row';
            div.id = `item-${item.id}`;

            div.innerHTML = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.img}" width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">$${item.price}</span>
            <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1" max="50">
            <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;

            cart_items.append(div);
        },

        removeItemUI: function(id) {
            const itemID = `item-${id}`;
            const selectedItem = document.getElementById(itemID);
            selectedItem.remove();
        },

        changeQuantity: function(id, value) {
            const itemID = document.getElementById(`item-${id}`);
            const options = itemID.querySelector('.cart-quantity-input');

            options.value = value;
        }
    }
})();

const appCtrl = (function(itemCtrl, uiCtrl) {
    const loadEventListener = function() {
        // Event Listeners 

        // For adding an item
        shop_items.forEach(function(item) {
            item.addEventListener('click', itemAdd);
        });

        // Remove element from item
        cart_items.addEventListener('click', removeItem);

        // Change quantity of element
        $('.cart-quantity-input').change(function() {
            changeQuantity(this);
        });

    }

    const itemAdd = function(e) {
        e.preventDefault();
        
        
        if(e.target.classList.contains('shop-item-button')) {
            let value = 1, flag = false;
        
            const parent = e.target.parentElement.parentElement;
            // Extract the data from HTML item
            const title = parent.querySelector('.shop-item-title').textContent,
                  img = parent.querySelector('.shop-item-image').getAttribute('src');
            let price = parent.querySelector('.shop-item-price').textContent;
            
            price = parseFloat(price.substring(1));

            // Get the already existing items
            const data = itemCtrl.getItems();
            data.forEach(function(item) {
                value = item.quantity;
                if(item.title === title) {
                    console.log('Already Exist');
                    // Count the quantities
                    flag = true;
                    value++;

                    const itemIndex = itemCtrl.getItemById(item.id);
                    itemCtrl.changeItemQuantity(itemIndex, value);

                    // Change value in UI
                    uiCtrl.changeQuantity(itemIndex+1, value);
                    return 0;
                }else {
                    flag = false;
                    value = 1;
                }
            });
            
            if(!flag) {
                // Add these values to item lists
                const new_item = itemCtrl.addNewItem(title, img, price, value);
                console.log(new_item);
    
                // Show the items in UI
                uiCtrl.addListItem(new_item);
            }

            // Show the total Calories
            const totalItemPrice = itemCtrl.getTotalPrice();
            uiCtrl.showTotalPrice(totalItemPrice);

        }
    };

    const removeItem = function(e) {
        e.preventDefault();

        if(e.target.classList.contains('btn-danger')) {
            // Remove the element from item lists
            const element = e.target.parentElement.parentElement;
            // 1. Get the item id
            const id = parseInt(element.id.substring(5));
            // 2. Get index of item based on id
            const itemID = itemCtrl.getItemById(id);
            // 3. Remove the element from list
            itemCtrl.removeItemById(itemID);
            // 4. Remove the item from UI
            uiCtrl.removeItemUI(id);

            // Show the total Calories
            const totalItemPrice = itemCtrl.getTotalPrice();
            uiCtrl.showTotalPrice(totalItemPrice);
        }
    };

    const changeQuantity = function(event) {
        const targetValue = parseInt($(event).val());

        //Get the id of parent
        const id = parseInt($(event).parent().parent().attr('id').substring(5));
        const elementItem = itemCtrl.getItemById(id);

        itemCtrl.changeItemQuantity(elementItem, targetValue); 

        const totalItemPrice = itemCtrl.getTotalPrice();
        uiCtrl.showTotalPrice(totalItemPrice);    
    };

    return {
        init: function() {
            // Get all the existing items in the cart
            const items = itemCtrl.getItems();
            // Show items in ui
            uiCtrl.showAllItems(items);

            // Get the totalPrice from items
            const totalItemPrice = itemCtrl.getTotalPrice();
            // Display it in UI
            uiCtrl.showTotalPrice(totalItemPrice);

            loadEventListener();
        }
    }

})(itemCtrl, uiCtrl);

appCtrl.init();