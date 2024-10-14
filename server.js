// // require("dotenv").config();

// // const express = require("express");
// // const axios = require("axios");
// // const {MongoClient, ObjectId} = require("mongodb");
// // const { Base64 } = require("js-base64");
// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // const uri = process.env.mongodb_uri


// // app.use(express.json());
// // let client, db;

// // async function connectToMongoDb(){
// //     try{
// //         console.log(uri);
// //         // client = new MongoClient(uri, { tlsAllowInvalidCertificates: true });
// //         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// //         await client.connect();
// //         db = client.db("ThinkFORMAL")
// //         console.log('connected to mongoDB')
// //     }
// //     catch(error){
// //         console.log('Not connected to mongoDB',error)
// //     }

// // }

// // Endpoint to handle user signup
// // app.post("/Signup", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });

// // // Endpoint to check password
// // app.get("/Customizedpassword", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });

// // // Endpoint to get locations
// // app.get("/location", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });

// // app.post("/location", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });

// // // Endpoint to get possiblelocation
// // app.get("/possiblelocation", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });

// // // Endpoint to get order
// // app.get("/Order", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });


// // app.get("/Users", (req, res) =>{
// //     // res.status(501).json({message: "Not Implemented"});
// //     db.collection("USERS_DETAILS").find({}).toArray().then((users) => {
// //         res.send(users)
// //     })
// // });



// // app.post("/Users", (req, res) => {
// //     try{
// //         const newUser = req.body
// //         db.collection("USERS_DETAILS")
// //             .insertOne({
// //                 ...newUser,
// //                 createdAt: new Date(),
// //             }).then((user) => {
// //                 console.log("User has been successfully posted")
// //                 res.send({
// //                     smg: "User has been successfully posted",
// //                     userId: user.insertedId
// //                 })
// //             })
// //     }
// //     catch(error){
// //         console.error("Could not post user", error)
// //         res.status(500).send("Could not post user")
// //     }
// // })




// // app.put("/Users/:id", (req, res) => {
// //     try {
// //         const userId = req.params.id;
// //         const updatedUser = req.body;

// //         db.collection("USERS_DETAILS")
// //             .findOneAndUpdate(
// //                 { _id: new ObjectId(userId) },
// //                 { $set: updatedUser },
// //                 { returnDocument: "after" }
// //             )
// //             .then((users) => {
// //                 if (!users.value) {
// //                     console.log("User updated:", users.value);
// //                     res.send(users.value);
// //                 } else {
// //                     console.log("User not found");
// //                     res.status(404).send("User not found");
// //                 }
// //             });
// //     } catch (error) {
// //         console.error("Error updating user:", error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });





// // app.delete("/Users/:id", (req, res) => {
// //     const userId = req.params.id;

// //     db.collection("USERS_DETAILS")
// //         .deleteOne({_id: new ObjectId(userId)})
// //         .then(user => {
// //             if (user.deletedCount === 0) {
// //                 console.log("User not found");
// //                 return res.status(404).send("User not found")
// //             }
// //             console.log("User has Been deleted")
// //             res.status(204).send()
// //         })
// // });

// // const express = require('express');
// // const app = express();

// // const basicAuth = (req, res, next) => {
// //     const authHeader = req.headers ['authorization'];

// //     if (!authHeader) {
// //         res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
// //         return res.status(401).send('Authentication required.');
// //     }

// //     const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

// //     if (username === 'admin' && password === 'password') {
// //         next();
// //     } else {
// //         res.status(403).send('Access denied.');
// //     }
// // };

// // // Signup endpoint - does not require authentication
// // app.post('/signup', (req, res) => {
// //     // Signup logic here
// //     app.post("/Signup", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });
// //     res.send('Signup successful!');
// // });

// // // Apply authentication to all other endpoints
// // app.use(basicAuth);

// // app.get('/protected', (req, res) => {
// //     res.send('You have accessed a protected route.');
// // });

// // More protected endpoints can be added here

// // const port = 3000;
// // app.listen(port, () => {
// //     console.log(Server running on port ${port});
// // });


// // app.post("/Order", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });

// // // Endpoint to post Check out page
// // app.post("/CheckOutPage", (req, res) =>{
// //     res.status(501).json({message: "Not Implemented"});
// // });


// // async function auth(req, res, next) {
// //     const head = req.headers.authorization;
  
// //     if (!head || !head.startsWith("Basic")) {
// //       return res.status(401).json({ message: "Invalid Authorization header" });
// //     }
  
// //     const base64Credentials = head.split(" ")[1];
// //     const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
// //     const [email, password] = credentials.split(":");
  
// //     const collection = db.collection("Users");
// //     const user = await collection.findOne({ email });
  
// //     if (!user) {
// //       return res.status(401).json({ message: "No user" });
// //     }
  
// //     // Ensure to store hashed passwords and compare hashes in production
// //     if (user.password !== password) {
// //       return res.status(401).json({ message: "Wrong password" });
// //     }
  
// //     req.user = user;
// //     next();
// //   }


// // app.post("/signup", (req, res) =>{
// //     res.status(200).json({message: "User is in the database"});
// //     });

// // app.use(auth);


// // // Endpoint to check password
// // app.get("/customizedPassword", auth, async (req, res) =>{
// //     res.status(200).json({message: "User is Authorized"});
// // });

// // // Endpoint to get locations
// // app.get("/location", auth, async (req, res) =>{
// //     res.status(200).json({message: "Location has been received"});
// // });

// // app.post("/location", async (req, res) =>{
// //     res.status(200).json({message: "Location has been posted"});
// // });

// // // Endpoint to get possiblelocation
// // app.get("/possiblelLocation", auth, async (req, res) =>{
// //     res.status(200).json({message: "Possible Location received"});
// // });

// // // Endpoint to get order
// // app.get("/order", auth, async (req, res) =>{
// //     res.status(200).json({message: "Order has been received"});
// // });

// require("dotenv").config();
// const express = require("express");
// const { MongoClient, ObjectId } = require("mongodb");
// const base64 = require("js-base64");
// const app = express();
// const PORT = process.env.PORT || 9000;

// // MongoDB connection string
// const uri = process.env.MONGODB_URI;

// app.use(express.json());
// let client, db;

// // Function to connect to MongoDB
// async function connectToMongo() {
//     try {
//         client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         db = client.db("ThinkFORMAL"); // Database name
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.log('Not connected to MongoDB', error);
//     }
// }

// app.post('/signup', async (req, res) => {
//     try {
//         const newUser = {
//             ...req.body,
//             createdAt: new Date() // Add the current date and time
//         };

//         const usersCollection = db.collection('Access');
//         const result = await usersCollection.insertOne(newUser);

//         if (result) {
//             console.log("User has been successfully posted");
//             res.status(201).send({
//                 msg: "User has been successfully posted",
//             });
//         } else {
//             res.status(500).send('Error inserting user');
//         }
//     } catch (error) {
//         console.error('Error inserting user:', error); // More detailed logging
//         res.status(500).send('Error processing request');
//     }
// });

// // app.get('/signin/:email', async (req, res) => {
// //     try {
// //         const userId = req.params.email;
// //         const usersCollection = db.collection('Access'); // Collection name
// //         const user = await usersCollection.findOne({ email });
        
// //         if (user) {
// //             res.json(user);
// //         } else {
// //             res.status(404).send('User not found');
// //         }
// //     } catch (error) {
// //         res.status(500).send('Error retrieving user');
// //     }
// // });

// app.get('/signin/:email', async (req, res) => {
//     try {
//       const userId = req.params.email;
//       const usersCollection = db.collection('Access'); // Collection name
//       const user = await usersCollection.findOne({ email: userId }); // Corrected query to use userId
      
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).send('User not found');
//       }
//     } catch (error) {
//       console.error('Error retrieving user:', error);
//       res.status(500).send('Error retrieving user');
//     }
//   });
  

// app.put('/users/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const updatedData = req.body; // Get the updated user data from the request body
//         const usersCollection = db.collection('Access');

//         // Find and update the user
//         const result = await usersCollection.updateOne(
//             { UserId: userId }, // Filter
//             { $set: updatedData } // Update operation
//         );

//         if (result.modifiedCount === 1) {
//             res.json({ msg: 'User updated successfully' });
//         } else if (result.matchedCount === 1) {
//             res.status(304).send('No changes made'); // No changes made
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         console.error('Error updating user:', error.message);
//         res.status(500).send('Error updating user');
//     }
// });

// app.delete('/users/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const usersCollection = db.collection('Access'); // Collection name

//         // Delete the user
//         const result = await usersCollection.deleteOne({ UserId: userId });

//         if (result.deletedCount === 1) {
//             res.status(200).send('User successfully deleted');
//         } else {
//             res.status(404).send('User not found'); 
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error.message);
//         res.status(500).send('Error deleting user');
//     }
// });


// app.listen(PORT, async () => {
//     await connectToMongo()
//     console.log(`The Server has Started on port ${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection string
const uri = process.env.MONGODB_URI;

app.use(express.json());
let client, db;

// Function to connect to MongoDB
async function connectToMongo() {
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("ThinkFORMAL"); // Database name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Not connected to MongoDB', error);
    }
}

// Endpoint to handle user signup (CREATE)
app.post('/signup', async (req, res) => {
    try {
        const newUser = {
            ...req.body,
            createdAt: new Date() // Add the current date and time
        };

        const usersCollection = db.collection('Access');
        const result = await usersCollection.insertOne(newUser);

        if (result) {
            console.log("User has been successfully posted");
            res.status(201).send({
                msg: "User has been successfully posted",
            });
        } else {
            res.status(500).send('Error inserting user');
        }
    } catch (error) {
        console.error('Error inserting user:', error); // More detailed logging
        res.status(500).send('Error processing request');
    }
});

// Endpoint to handle user signin (READ)
app.get('/signin/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const usersCollection = db.collection('Access'); // Collection name
        const user = await usersCollection.findOne({ email: email });

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Error retrieving user');
    }
});

// Endpoint to handle user update (UPDATE)
app.put('/updateuser/:email', async (req, res) => {
    try {
        const email = req.params.email; // Get the email from the request parameters
        const updatedData = req.body; // Get the updated user data from the request body
        const usersCollection = db.collection('Access');

        // Find and update the user
        const result = await usersCollection.updateOne(
            { email: email }, // Filter by email
            { $set: updatedData } // Update operation
        );

        if (result.modifiedCount === 1) {
            res.json({ msg: 'User updated successfully' });
        } else if (result.matchedCount === 1) {
            res.status(304).send('No changes made'); // No changes made
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).send('Error updating user');
    }
});

// Endpoint to handle user deletion (DELETE)
app.delete('/deleteuser/:email', async (req, res) => {
    try {
        const email = req.params.email; // Get the email from the request parameters
        const usersCollection = db.collection('Access'); // Collection name

        // Delete the user based on the email
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

// Starting the server and connecting to MongoDB
app.listen(PORT, async () => {
    await connectToMongo();
    console.log(`The Server has started on port ${PORT}`);
});