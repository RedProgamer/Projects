const lists = document.getElementById('draggable-list');
const Checkbtn = document.getElementById('check');

const richestArr = [
  'Jeff Bezos',
  'Elon Musk',
  'Bernard Arnault',
  'Bill Gates',
  'Mark Zuckerberg',
  'Warren Buffett',
  'Larry Ellison',
  'Larry Page',
  'Sergey Brin',
  'Mukesh Ambani',
];


const listItems = [];

/**
 * @param {number} stores the data index of the list items
*/

let dragStartIdx = 0;

createLists();

// Create List items
function createLists() {
  [...richestArr]
  .map((people) => (
    { value: people,
      sort: Math.random(), 
    }))
  .sort((a,b) => a.sort - b.sort)
  .map(object => object.value)
  .forEach(function(person, index) {

    const listItem = document.createElement('li');

    // listItem.className = 'over';
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <span class="number">${index++}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);
    lists.appendChild(listItem);
  });

  addEventListeners();
};

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(function(draggable) {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });

};


function dragStart() {
  dragStartIdx = +this.closest('li').getAttribute('data-index');
  console.log(dragStartIdx);
};

function dragEnter() {
  this.classList.add('over');
};

function dragOver(e) {
  e.preventDefault();
};

function dragLeave() {
  this.classList.remove('over');
};

function dragDrop() {
  const dragEndIdx = +this.getAttribute('data-index');
  console.log(dragEndIdx);

  swapItems(dragStartIdx, dragEndIdx);
  
  this.classList.remove('over');
};

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

/**
 * @param checks if the list is correct
 */
function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector('.draggable').innerText.trim();

    if(personName !== richestArr[index]) {
      item.classList.add('wrong');
    }else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });
}


// Event listener for check button
Checkbtn.addEventListener('click', checkOrder);