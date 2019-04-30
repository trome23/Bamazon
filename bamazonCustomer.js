var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connection as id: " + connection.threadId);
    showTable();
})
 
function showTable() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\n");
        console.log(`BAMAZON`);
        console.log("\n");

        var t = new Table;

        results.forEach(function(product) {
            t.cell("Item", product.item_id);
            t.cell("Product", product.product_name);
            t.cell("Department", product.department_name);
            t.cell("Price", product.price, Table.number(2));
            t.cell("Quantity", product.stock_quantity);
            t.newRow()
        });   
        console.log(t.toString());
        shopping();
    });
    

function shopping() {
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
    ]).then(function(answers) {
        var selection = answers.productId;
        var amount = parseInt(answers.howMany);
        connection.query("SELECT * FROM products WHERE item_id = ?", selection, function(err, res) {
            // console.log(res[0].price);
                var item = res[0].item_id;
                var currentPrice = res[0].price;
                var currentQuantity = res[0].stock_quantity;
                var total = (amount * currentPrice).toFixed(2);
                ;
                if(currentQuantity < amount) {
                    console.log("Insufficient Quantity");
                    showTable();                    
                } else {
                   
                    connection.query("UPDATE products SET stock_quantity =" + (currentQuantity - amount) + " WHERE item_id = " + item, function(err, results) {

                        console.log("Inventory Updated!"); 
                        console.log("Your new total is= $ " + total);            
                        exit()         
                    });
                  
                    
                }

            })
            
        })
    };
};
        

    function exit() {
        connection.end();
    }