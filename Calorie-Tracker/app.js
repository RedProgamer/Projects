// Storage Controller

// Item Controller
const itemCtrl = (function() {
    // Item contructor
    const item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structures/ State
    const data = {
        items: [
            {id:0, name: "Butter Chicken", calories: 700},
            {id:1, name: "Rice", calories: 150},
            {id:2, name: "Tea", calories: 75},
        ],
        currentItem: null,
        totalCalories: 0,
    };


    // Public Method
    return {
        getItems: () => { return data.items; },
        
        addNewData: function(name, calories) {

            const id = function() {
                if(data.items.length > 0) {
                    return data.items[data.items.length - 1].id + 1;
                }else {
                    return 0;
                }
            };
            const newItem = new item(id(), name, calories);
            
            data.items.push(newItem);
            return newItem;
            
        },

        getTotalCalories: function() {
            let total = 0;

            data.items.forEach(function(item) {
                total += parseInt(item.calories);
            });
            
            data.totalCalories = total;

            // return total calories
            return data.totalCalories;
        },

        getItemById: function(id) {
            let found = null;

            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        setCurrentItem: function(currentItem) {
            data.currentItem = currentItem;
        },

        getCurrentItem: function() {
            return data.currentItem;
        },

        logData: () => { return data; }
    }
})();

// UI Controller
const uiCtrl = (function() {

    const UISelector = {
        itemLists: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        itemTotalCalories: '.total-calories',
        
    };

    return {
        populateItemLists: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `
            });

            document.querySelector(UISelector.itemLists).innerHTML = html;
        },
        
        getItemInput: function() {
            return {
                name: document.querySelector(UISelector.itemName).value,
                calories: document.querySelector(UISelector.itemCalories).value
            }
        },

        addListItem: function(item) {
            document.querySelector(UISelector.itemLists).style.display = 'block';   

            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                             </a>`;
            
            //Insert Item
            document.querySelector(UISelector.itemLists).insertAdjacentElement('beforeend', li);
        },

        addItemToForm: function() {
            document.querySelector(UISelector.itemName).value = itemCtrl.getCurrentItem().name;
            document.querySelector(UISelector.itemCalories).value = itemCtrl.getCurrentItem().calories;
            uiCtrl.showEditState();
        },

        showTotalCalories: function(calories) {
            document.querySelector(UISelector.itemTotalCalories).textContent = calories; 
        },

        clearInputFields: function() {
            document.querySelector(UISelector.itemName).value = '';
            document.querySelector(UISelector.itemCalories).value = '';
        },

        hideList: function() {
            document.querySelector(UISelector.itemLists).style.display = 'none';
        },

        clearEditState: function() {
            uiCtrl.clearInputFields();
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.addBtn).style.display = 'inline';
        },
        
        showEditState: function() {
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
            document.querySelector(UISelector.addBtn).style.display = 'none';
        },

        getSelectors: function() { return UISelector; },

    }
})();

// App Controller
const App = (function(itemCtrl, uiCtrl) {

    // Load Event Listeners
    const loadEventListeners = function() {
        // Get UI selectors
        const UISelector = uiCtrl.getSelectors();

        // Add item event
        document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit);
        
        // Edit Icon click event
        document.querySelector(UISelector.itemLists).addEventListener('click', itemUpdateSubmit)
    
    };

    const itemAddSubmit = function(e){
        console.log('Added');

        // Get form input from UI Controller
        const input = uiCtrl.getItemInput();
        
        if(input.name === '' || input.calories === '') {
            alert('Please enter the respected values');
        }else {
            const newItem = itemCtrl.addNewData(input.name, input.calories);

            uiCtrl.addListItem(newItem);

            // Clear input fields
            uiCtrl.clearInputFields();
        }

        e.preventDefault();
    };

    const itemUpdateSubmit = function(e) {

        if(e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;
            
            // Parse the list id and get the id
            const listIdArray = listId.split('-');
            const mainId = parseInt(listIdArray[1]);
            
            // Get item by id
            const itemToEdit = itemCtrl.getItemById(mainId);
            
            // Set current Item
            itemCtrl.setCurrentItem(itemToEdit);

            uiCtrl.addItemToForm();
        }

        e.preventDefault();

    };

    return {
        init: function() {
            // Clear edit state
            uiCtrl.clearEditState();

            console.log("Initializing App");
            
            // Fetch Items from data structures
            const items = itemCtrl.getItems();

            // check if any items
            if(items.length === 0) {
                uiCtrl.hideList();
            }else {
                // Populate lists with items
                uiCtrl.populateItemLists(items);
            }

            // Get total calories
            const totalCalories = itemCtrl.getTotalCalories();
            uiCtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }
})(itemCtrl, uiCtrl);

App.init();
