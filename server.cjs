require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

app.use(express.json());
let client, db;
app.use(cors());

// Function to connect to MongoDB
async function connectToMongo() {
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db("ThinkFORMAL");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

// Middleware to check if the database connection is established
app.use((req, res, next) => {
    if (!db) return res.status(500).send('Database connection not established');
    next();
});

/* User Authentication Routes */

// Signup (CREATE)
app.post('/signup', async (req, res) => {
    try {
        const newUser = { ...req.body, createdAt: new Date() };
        const usersCollection = db.collection('Users');
        const result = await usersCollection.insertOne(newUser);

        if (result) {
            console.log("User has been successfully posted");
            res.status(201).send({ msg: "User has been successfully posted" });
        } else {
            res.status(500).send('Error inserting user');
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Error processing request');
    }
});

// Signin (READ)
app.get('/signin', async (req, res) => {
    try {
        const email = req.query.email;
        const usersCollection = db.collection('Users');
        const user = await usersCollection.findOne({ email: email });

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Error retrieving user');
    }
});

// Update user (UPDATE)
app.put('/updateuser', async (req, res) => {
    try {
        const email = req.query.email;
        const updatedData = req.body;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        const usersCollection = db.collection('Users');
        const result = await usersCollection.updateOne({ email: email }, { $set: updatedData });

        if (result.modifiedCount === 1) {
            res.json({ msg: 'User updated successfully' });
        } else if (result.matchedCount === 1) {
            res.status(304).send('No changes made');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).send('Error updating user');
    }
});

// Delete user (DELETE)
app.delete('/deleteuser', async (req, res) => {
    try {
        const email = req.query.email;
        const usersCollection = db.collection('Users');
        const result = await usersCollection.deleteOne({ email: email });

        if (result.deletedCount === 1) {
            res.status(200).send('User successfully deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).send('Error deleting user');
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const usersCollection = db.collection('Users');
        const users = await usersCollection.find({}).toArray();

        if (users.length > 0) {
            res.status(200).send({ message: users });
        } else {
            res.status(404).send('No users found');
        }
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

/* Product Management Routes */

// CREATE a new product
app.post('/products', async (req, res) => {
    try {
        const newProduct = { ...req.body, createdAt: new Date() };
        const productsCollection = db.collection('Products');

        // Insert the new product
        const result = await productsCollection.insertOne(newProduct);

        if (result.insertedId) {
            // Fetch the full product details using the insertedId
            const insertedProduct = await productsCollection.findOne({ _id: result.insertedId });

            if (insertedProduct) {
                console.log("Product has been successfully created");
                // Respond with the full product object
                res.status(201).json(insertedProduct);
            } else {
                res.status(404).send('Product not found after insertion');
            }
        } else {
            res.status(500).send('Error inserting product');
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error processing request');
    }
});


// READ all products
app.get('/products', async (req, res) => {
    try {
        const productsCollection = db.collection('Products');
        const products = await productsCollection.find({}).toArray();

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).send('No products found');
        }
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send('Error retrieving products');
    }
});

// READ a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productsCollection = db.collection('Products');
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).send('Error retrieving product');
    }
});

// UPDATE a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;
        const productsCollection = db.collection('Products');

        const result = await productsCollection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: updatedData }
        );

        if (result.modifiedCount === 1) {
            res.json({ msg: 'Product updated successfully' });
        } else if (result.matchedCount === 1) {
            res.status(304).send('No changes made');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send('Error updating product');
    }
});

// DELETE a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productsCollection = db.collection('Products');

        const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount === 1) {
            res.status(200).send('Product successfully deleted');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).send('Error deleting product');
    }
});

// Start the server
app.listen(PORT, async () => {
    await connectToMongo();
    console.log(`Server started on port ${PORT}`);
});
