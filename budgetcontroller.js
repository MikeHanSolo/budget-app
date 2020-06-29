var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    // Placeholder "does not exist" value
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push to data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    },

    deleteItem: function (type, id) {
      var ids, index;
      
      // Map returns brand new array
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      // Get where list item is located in the array
      index = ids.indexOf(id);

      if (index >= 0) {
        // Splice 2nd argument is how many items to remove starting at index
        data.allItems[type].splice(index, 1)
      }
    },

    calculateBudget: function() {
      // 1. Calculate total income and total expenses
      calculateTotal('inc');
      calculateTotal('exp');
      // 2. Calculate the budget
      data.budget = data.totals.inc - data.totals.exp;
      // 3. Calculate the percentage of income for ea. expense
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    debug: function() {
      console.log(data);
    }
  }

})();