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
            {id:0, name: "Rice", calories: 150},
            {id:0, name: "Tea", calories: 75},
        ],
        currentItem: null,
        totalCalories: 0
    };


    // Public Method
    return {
        getItems: () => { return data.items; },
        logData: () => { return data; }
    }
})();

// UI Controller
const uiCtrl = (function() {

    const UISelector = {
        itemLists: '#item-list'
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
        }
    }
})();

// App Controller
const App = (function(itemCtrl, uiCtrl) {
    return {
        init: function() {
            console.log("Initializing App");
            
            // Fetch Items from data structures
            const items = itemCtrl.getItems();
            
            // Populate lists with items
            uiCtrl.populateItemLists(items);
        }
    }
})(itemCtrl, uiCtrl);

App.init();
