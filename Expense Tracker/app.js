const StorageCtrl = (function() {
    return {
        storeData: function(item) {
            let items;

            if(localStorage.getItem('budget') === null) {
                items = [];

                items.push(item);

                localStorage.setItem('budget', JSON.stringify(items));
            }else {
                // Getting existing data from localStorage
                items = JSON.parse(localStorage.getItem('budget'));
                
                items.push(item);
                localStorage.setItem('budget', JSON.stringify(items));
            }
        },

        getData: function() {
            let items;
            if(localStorage.getItem('budget') === null) {
                items = [];
            }else {
                items = JSON.parse(localStorage.getItem('budget'));
            }

            return items;
        },

        deleteItem: function(id) {
            let items = JSON.parse(localStorage.getItem('budget'));

            const ids = items.map(item => item.id);
            const index = ids.indexOf(id);

            items.splice(index, 1);

            localStorage.setItem('budget', JSON.stringify(items));
        }

    }
})();

const ItemCtrl = (function() {

    const Item = function(id, text, amount) {
        this.id = id;
        this.text = text;
        this.amount = amount;
    };

    const data = {
    items: StorageCtrl.getData(),
    totalAmount: 0,
    totalIncome: 0,
    totalExpense: 0,
    };

    return {
        getData: ()=> { return data; },
        getItems: ()=> { return data.items; },

        addElement: function(text, amount) {
            const id = function() {
                if(data.items.length > 0)
                    return data.items[data.items.length - 1].id  + 1;
                else
                    return 0;
            }

            const item = new Item(id(), text, amount);
            
            // Adding item to localStorage
            StorageCtrl.storeData(item);

            data.items.push(item);

            return item;
        },

        removeElement: function(id) {
            const ids = data.items.map(item => item.id);

            const index = ids.indexOf(id);

            data.items.splice(index, 1);
        },

        calcTotalIncome: function() {
            let totalIncome = 0;
            data.items.forEach(function(item) {
                if(item.amount > 0) {
                    totalIncome += item.amount;
                }
            });
            data.totalIncome = totalIncome;
            return data.totalIncome;
        },

        calcTotalExpense: function() {
            let totalExpense = 0;
            data.items.forEach(function(item) {
                if(item.amount < 0) {
                    totalExpense += item.amount;
                }
            });
            data.totalExpense = Math.abs(totalExpense);
            return data.totalExpense;
        },

        calcTotalAmount: function() {
            data.totalAmount = data.totalIncome - data.totalExpense;
            return data.totalAmount;
        }

    }
})();

const UICtrl = (function() {

    const UISelector = {
        form: '#form',
        formControl: '.form-control',
        inputItemName: '#text',
        inputItemAmount: '#amount',
        moneyLists: '.list',
        balance: '#balance',
        income: '#money-plus',
        expense: '#money-minus',
        smallMsg: 'small',
        list: '#items',
        deleteBtn: '.delete-btn',
    };

    function formatMoney(money) {
        return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    return {
        UISelector: ()=> { return UISelector; },

        showItems: function(item) {
            const list = document.querySelector(UISelector.moneyLists);
            
            const li = document.createElement('li');
            const classValue = item.amount < 0 ? 'minus' : 'plus';
            const sign = item.amount < 0 ? '-' : '+';
            const amount = Math.abs(item.amount);

            li.className = classValue;
            li.id = `items-${item.id}`;
            li.innerHTML = `${item.text} <span>${sign}${formatMoney(amount)}</span><button class="delete-btn">x</button>`
            
            list.insertAdjacentElement('beforeend', li);
        },

        showAmount(total, income, expense) {
            const sign = total < 0 ? '-' : '+';

            document.querySelector(UISelector.balance).textContent = `${sign}${formatMoney(Math.abs(total))}`;
            document.querySelector(UISelector.income).textContent =  `+${formatMoney(income)}`;
            document.querySelector(UISelector.expense).textContent = `-${formatMoney(expense)}`;
        },

        showError: function(elementName, msg) {
            const parentElement = document.querySelector(elementName).parentElement;
            const errorTextMessage = parentElement.querySelector(UISelector.smallMsg);

            parentElement.classList.remove('success');
            parentElement.classList.remove('error');
            parentElement.classList.add('error');
            // parentElement.classList.remove('error');

            errorTextMessage.style.visibility = 'visible';
            errorTextMessage.innerText = msg;
        },

        showSuccess: function(elementName) {
            const parentElement = document.querySelector(elementName).parentElement;
            const errorTextMessage = parentElement.querySelector(UISelector.smallMsg);

            parentElement.classList.remove('error');
            parentElement.classList.add('success');

            errorTextMessage.style.visibility = 'hidden';
        },

        deleteItem: function(event) {
            if(event.classList.contains('delete-btn')) {
                event.parentElement.remove();
            }
        },

        clearInputFields: function() {
            document.querySelector(UISelector.inputItemName).value = '';
            document.querySelector(UISelector.inputItemAmount).value = '';
        },

        getInputValues: function() {
            return {
                text: document.querySelector(UISelector.inputItemName).value,
                amount: parseInt(document.querySelector(UISelector.inputItemAmount).value),
            }
        },

    }
})();


const AppCtrl = (function(StorageCtrl, ItemCtrl, UICtrl) {

    const UI = UICtrl.UISelector();
    let correctAmt = null, correctText = null;
    
    function loadEventListener() {
        document.querySelector(UI.form).addEventListener('submit', submittedForm);
        document.querySelector(UI.moneyLists).addEventListener('click', deleteItem);
    };

    const submittedForm = function(e) {
        // Get Values from input
        const values = UICtrl.getInputValues();
        
        if(isNaN(values.amount)) {
            UICtrl.showError(UI.inputItemAmount, `Please enter a valid amount`);
            correctAmt = false;
        }else {
            UICtrl.showSuccess(UI.inputItemAmount);
            correctAmt = true;
        }

        if(values.text.trim().length <= 0) {
            UICtrl.showError(UI.inputItemName, `Please enter a valid item`);
            correctText = false;
        }else {
            UICtrl.showSuccess(UI.inputItemName);
            correctText = true;
        }

        if(correctText && correctAmt) {
            // Add Elements to the data structure
            const dataStructure = ItemCtrl.addElement(values.text, values.amount);
    
            // Add new item in the lists
            UICtrl.showItems(dataStructure);
    
            // Clear Input Fields
            UICtrl.clearInputFields();
    
            // Calculate Total Amount
            const amount = {
                income: ItemCtrl.calcTotalIncome(),
                expense: ItemCtrl.calcTotalExpense(),
                total: ItemCtrl.calcTotalAmount(),
            };
    
            UICtrl.showAmount(amount.total, amount.income, amount.expense);
        }


        e.preventDefault();
    };

    const deleteItem = function(e) {
        const position = e.target;

        // Remove Element from data structure
        if(position.className === 'delete-btn') {
            const selectedItem = position.parentElement.id;
            const id = selectedItem.split('-')[1];
            
            // Removing element from data structure
            ItemCtrl.removeElement(parseInt(id));
            
            // Removing Element from localStorage
            StorageCtrl.deleteItem(parseInt(id));
        }


        // Remove Element from UI
        UICtrl.deleteItem(position);

        // Calculate Total Amount
        const amount = {
            income: ItemCtrl.calcTotalIncome(),
            expense: ItemCtrl.calcTotalExpense(),
            total: ItemCtrl.calcTotalAmount(),
        };

        UICtrl.showAmount(amount.total, amount.income, amount.expense);
    }

    return {
        init: function() {

            // Clear any existing text from the input fields
            UICtrl.clearInputFields();
            
            // Getting the items from the data structure
            const items = ItemCtrl.getItems();
            
            // Display Items in UI
            items.forEach((item) => {
                UICtrl.showItems(item);
            });

            //Calculate Amount
            const amount = {
                income: ItemCtrl.calcTotalIncome(),
                expense: ItemCtrl.calcTotalExpense(),
                total: ItemCtrl.calcTotalAmount(),
            };
            
            // Show output in UI
            UICtrl.showAmount(amount.total, amount.income, amount.expense);

            // Control the actions
            loadEventListener();
        }
    }
})(StorageCtrl,ItemCtrl, UICtrl);


AppCtrl.init();