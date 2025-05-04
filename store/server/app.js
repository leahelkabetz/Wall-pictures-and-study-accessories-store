const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes for each resource

// Users
app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(req.body)
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users data.');
            return;
        }
        const users = JSON.parse(data);
        newUser.id = users.length + 1; 
        users.push(newUser);
        fs.writeFile('users.json', JSON.stringify(users), err => {
            if (err) {
                res.status(500).send('Error writing users data.');
                return;
            }
            res.status(201).send('User created successfully.');
        });
    });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users data.');
            return;
        }
        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id == userId);
        if (userIndex === -1) {
            res.status(404).send('User not found.');
            return;
        }
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        fs.writeFile('users.json', JSON.stringify(users), err => {
            if (err) {
                res.status(500).send('Error writing users data.');
                return;
            }
            res.send('User updated successfully.');
        });
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(parseInt(req.params.id));
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users data.');
            return;
        }
        let users = JSON.parse(data);
        const updatedUsers = users.filter(user => user.id !== userId);
        if (users.length === updatedUsers.length) {
            res.status(404).send('User not found.');
            return;
        }
        fs.writeFile('users.json', JSON.stringify(updatedUsers), err => {
            if (err) {
                res.status(500).send('Error writing users data.');
                return;
            }
            res.send('User deleted successfully.');
        });
    });
});
//products
app.get('/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading products data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});
app.post('/products', (req, res) => {
    const newProduct = req.body;
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Products data.');
            return;
        }
        const products= JSON.parse(data);
        newProduct.id = (products.length+1)*10;
        console.log(newProduct);
        products.push(newProduct);
        fs.writeFile('products.json', JSON.stringify(products), err => {
            if (err) {
                res.status(500).send('Error writing Products data.');
                return;
            }
            res.status(201).send('Product created successfully.');
        });
    });
});

app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Products data.');
            return;
        }
        let products = JSON.parse(data);
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            res.status(404).send('Product not found.');
            return;
        }
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        fs.writeFile('products.json', JSON.stringify(products), err => {
            if (err) {
                res.status(500).send('Error writing Products data.');
                return;
            }
            res.status(200).send('Product updated successfully.');
        });
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Products data.');
            return;
        }
        let products= JSON.parse(data);
        const updatedproducts= products.filter(product => product.id !== productId);
        if (products.length === updatedproducts.length) {
            res.status(404).send('Product not found.');
            return;
        }
        fs.writeFile('products.json', JSON.stringify(updatedproducts), err => {
            if (err) {
                res.status(500).send('Error writing Products data.');
                return;
            }
            res.status(200).send('product deleted successfully.');
        });
    });
});


//orders
app.get('/orders', (req, res) => {
    fs.readFile('orders.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Orders data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/orders', (req, res) => {
    const newOrder = req.body;
    fs.readFile('orders.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Orders data.');
            return;
        }
        const orders= JSON.parse(data);
        newOrder.id = (orders.length+1)*100;
        orders.push(newOrder);
        fs.writeFile('orders.json', JSON.stringify(orders), err => {
            if (err) {
                res.status(500).send('Error writing Orders data.');
                return;
            }
            res.status(201).send('Order created successfully.');
        });
    });
});

app.put('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const updatedOrder = req.body;
    fs.readFile('orders.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Orders data.');
            return;
        }
        let orders = JSON.parse(data);
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex === -1) {
            res.status(404).send('Order not found.');
            return;
        }
        orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };
        fs.writeFile('orders.json', JSON.stringify(orders), err => {
            if (err) {
                res.status(500).send('Error writing Orders data.');
                return;
            }
            res.send('Order updated successfully.');
        });
    });
});

app.delete('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    fs.readFile('orders.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading Orders data.');
            return;
        }
        let orders= JSON.parse(data);
        const updatedorders= orders.filter(order => order.id !== orderId);
        if (orders.length === updatedorders.length) {
            res.status(404).send('Order not found.');
            return;
        }
        fs.writeFile('orders.json', JSON.stringify(updatedorders), err => {
            if (err) {
                res.status(500).send('Error writing Orders data.');
                return;
            }
            res.send('order deleted successfully.');
        });
    });
});

//shoppingCarts
app.get('/shoppingCarts', (req, res) => {
    fs.readFile('shoppingCarts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading ShoppingCarts data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/shoppingCarts', (req, res) => {
    const newShoppingCart = req.body;
    fs.readFile('shoppingCarts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading ShoppingCarts data.');
            return;
        }
        const shoppingCarts= JSON.parse(data);
        newShoppingCart.id = (shoppingCarts.length+1)*1000;
        shoppingCarts.push(newShoppingCart);
        fs.writeFile('shoppingCarts.json', JSON.stringify(shoppingCarts), err => {
            if (err) {
                res.status(500).send('Error writing ShoppingCarts data.');
                return;
            }
            res.status(201).send('ShoppingCart created successfully.');
        });
    });
});

app.put('/shoppingCarts/:id', (req, res) => {
    const shoppingCartId = parseInt(req.params.id);
    const updatedShoppingCart = req.body;
    fs.readFile('shoppingCarts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading ShoppingCarts data.');
            return;
        }
        let shoppingCarts = JSON.parse(data);
        const shoppingCartIndex = shoppingCarts.findIndex(shoppingCart => shoppingCart.id === shoppingCartId);
        if (shoppingCartIndex === -1) {
            res.status(404).send('ShoppingCart not found.');
            return;
        }
        shoppingCarts[shoppingCartIndex] = { ...shoppingCarts[shoppingCartIndex], ...updatedShoppingCart };
        fs.writeFile('shoppingCarts.json', JSON.stringify(shoppingCarts), err => {
            if (err) {
                res.status(500).send('Error writing ShoppingCarts data.');
                return;
            }
            res.send('ShoppingCart updated successfully.');
        });
    });
});

app.delete('/shoppingCarts/:id', (req, res) => {
    const shoppingCartId = parseInt(req.params.id);
    fs.readFile('shoppingCarts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading ShoppingCarts data.');
            return;
        }
        let shoppingCarts= JSON.parse(data);
        const updatedshoppingCarts= shoppingCarts.filter(shoppingCart => shoppingCart.id !== shoppingCartId);
        if (shoppingCarts.length === updatedshoppingCarts.length) {
            res.status(404).send('ShoppingCart not found.');
            return;
        }
        fs.writeFile('shoppingCarts.json', JSON.stringify(updatedshoppingCarts), err => {
            if (err) {
                res.status(500).send('Error writing ShoppingCarts data.');
                return;
            }
            res.send('shoppingCart deleted successfully.');
        });
    });
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
