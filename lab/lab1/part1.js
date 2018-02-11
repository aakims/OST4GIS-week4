/* =====================
# Lab 1, Part 1 — More Underscore

## Introduction

Set variables "query1" through "query7" by using underscore functions to answer
the specified question.

There are two stretch goals. In the final one,  you will be asked to use a templating
system. You are encouraged to at least try and use underscore's templating function
as it will give you some idea about how an important and common problem in computing
(i.e. how can I create text given a collection of data?)


===================== */

var bakedGoods = [
  {
    "name": "Carrot",
    "type": "Cake",
    "inventory": 44,
    "price": 3.49
  },
  {
    "name": "Chocolate",
    "type": "Cake",
    "inventory": 21,
    "price": 3.49
  },
  {
    "name": "Sourdough",
    "type": "Bread",
    "inventory": 5,
    "price": 5.29
  },
  {
    "name": "Tiramisu",
    "type": "Cake",
    "inventory": 15,
    "price": 4.99
  },
  {
    "name": "Rye",
    "type": "Bread",
    "inventory": 6,
    "price": 5.09
  },
  {
    "name": "Whole Wheat",
    "type": "Bread",
    "inventory": 39,
    "price": 4.49
  },
];

var printMenu = function(foodList) {
  _.each(foodList, function(food) {
    console.log(food.name + ' ... $' + food.price);
  });
};

console.log('List of baked goods', bakedGoods);

/* =====================
Is printMenu a function? Answer this question with underscore. Should evaluate
to true.
===================== */

var query1 = _.isFunction(printMenu);

console.log('printMenu is a function:', query1);

/* =====================
Is bakedGoods an array? Answer this question with underscore. Should evaluate
to true.
===================== */

var query2 = _.isArray(bakedGoods);

console.log('bakedGoods is an array:', query2);

/* =====================
Is the first element in bakedGoods an object? Answer this question with
underscore. Should evaluate to true.
===================== */

var query3 = _.isObject(bakedGoods[0]);

console.log('The first element in bakedGoods is an object:', query3);

/* =====================
Use _.where to return all cakes. Or bread. Whichever is your favorite.
===================== */

var query4 = _.where(bakedGoods, {"type": "Bread"});

console.log('All bread. Or cakes:', query4);

/* =====================
Use _.filter to return all baked goods that cost more than $4.
===================== */

var query5 = _.filter(bakedGoods, function (obj) {
  return obj.price > 4;
});

console.log('More than $4:', query5);

/* =====================
Use _.sortBy to order the list by inventory (from lowest to highest).
===================== */

var query6 = _.sortBy(bakedGoods, 'inventory');
var query6D = _.sortBy(bakedGoods, 'inventory').reverse();

console.log('Sorted by inventory (lowest to highest):', query6);
console.log('When sorted from highest to lowest:', query6D);

/* =====================
Use _.groupBy to organize the baked goods by type.
===================== */

var query7 = _.groupBy(bakedGoods, 'type');

console.log('Grouped by type:', query7);

/* =====================
Stretch Goal:

Grouping by type (query7) changed the structure of our data. Instead of an array of
objects, we have an object that contains arrays of objects. Let's do something
with this new data structure.

>array of objects: [{..},{..},{..}]
>an object with arrays of object {cake: Array(3), Bread: Array(3)}
{cake: [{..}, {..}, {..}], bread: [{..}, {..}, {..}]}

Rewrite the printMenu function to receive the new structure (query7) and print
(console.log) a menu with headings. Running printMenu(query7) should log:

Cake
Carrot ... $3.49
Chocolate ... $3.49
Tiramisu ... $4.99
Bread
Sourdough ... $5.29
Rye ... $5.09
Whole Wheat ... $4.49
===================== */

//what the original function printMenu prints:
console.log("\n>> the original menu \n");
printMenu(bakedGoods);

//update function printMenu
printMenu = function(groupedFoodListObj) {
  _.each(_.keys(groupedFoodListObj), function(group) {
    console.log(group);
    _.each(_.propertyOf(groupedFoodListObj)(group), function(foodObj) {
      console.log(foodObj.name + ' ... $' + foodObj.price);
    });
  });
};

//updated version
console.log("\n>> the changed version: \n");
printMenu(query7);

/* =====================
Stretch Goal:

We're writing each line of the menu with the code `food.name + " ... $" + food.price`.
While this method technically works, it will become less manageable when the
content becomes more complicated (this can happen as the number of strings and variables
increases). Underscore has a 'templating' system that can be used to clean up this
rendering process.

Use _.template to render the price lines of the menu (Carrot ... $3.49).

var compiled = _.template("<% print('Hello ' + epithet); %>");
compiled({epithet: "stooge"});
=> "Hello stooge"

===================== */

/* START HERE
//update again using _.template
printMenu2 = function(groupedFoodListObj) {
  _.each(_.keys(groupedFoodListObj), function(group) {
    var foodGroup = group;
    console.log(foodGroup);
    var foodItems = [];
    foodItems = _.propertyOf(groupedFoodListObj)(foodGroup);
    console.log(foodItems);
    var formatMenu =
      '<% _.each( %>' +
      '<%= foodGroup%>' +
      '<% \', function(foodObj) { %>' +
      '<% console.log(%>' +
        '<%= foodObj.name %>' +
        '... $' +
        '<%= foodObj.price %>' +
      '<%);}); %>';
    _.template(formatMenu, foodItems);
  });
};

    */

  /*references:
  http://www.kadrmasconcepts.com/blog/2012/02/20/underscore-js-template-revealed/
  http://www.kadrmasconcepts.com/blog/2012/02/20/underscore-js-template-revealed/
  https://stackoverflow.com/questions/22033727/iterating-through-objects-in-underscore-js-templates
  http://underscorejs.org/#template
  */


//updated version
// printMenu2(query7);
