/*
UI Module
- Capture input values
- Add new item to UI
- Update UI

Data Module
- Add new item to data structure
- Calculate budget

Controller Module
- Event handler
*/

var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget in the UI
    UICtrl.displayBudget(budget);
  }

  var ctrlAddItem = function() {
    var input, newItem;
    
    // 1. get input data
    input = UIController.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(
        input.type, 
        input.description, 
        input.value);
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();
      // 4. Calculate and update budget
      updateBudget();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID;
    
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete item from the UI
      UIController.deleteListItem(itemID);
    
      // 3. Update and show the new budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('application init');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    } 
  }

})(budgetController, UIController);

 controller.init();