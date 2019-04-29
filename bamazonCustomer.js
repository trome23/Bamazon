var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    console.log("Connection as id: " + connection.threadId);
    start();
})

var start = function(){
    inquirer.prompt([
        {
            name:"productId",
            type: "input",
            message: "Please enter the ID of the item you wish to purchase: "
        },
        {
            name:"howMany",
            type: "input",
            message: "How many units do you want to buy? "
        }
    ]).then(function(res) {
        var itemId = res.productId;
        var quantity = res.howMany;

        checkInventory(itemId, quantity);
        }
    })
}

var checkInventory = function(productId, howMany) {

}