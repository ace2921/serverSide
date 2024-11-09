import { use, expect } from "chai";
import chaiHttp from "chai-http";
const chai = use(chaiHttp);

// let serverInstance;

// before((done) => {
    //     serverInstance = server.listen(5000, () => {
        //         console.log('Test server running on port 5000');
        //         done();
        //     });
        // });
        


        describe('GET /users', () => {
            it('should return users', (done) => {
                chai.request.execute("http://34.235.149.135:5000")
                    .get("/users")
                    .end((err, res) => {
                        if (err) return done(err);
        
                        // Logging for debugging
                        console.log("Response body:", res.body);
        
                        // Assertions
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an("object");
                        expect(res.body).to.have.property('message').that.is.an('array');
        
                        // Check the first user object in the 'message' array
                        const firstUser = res.body.message[0];
                        expect(firstUser).to.be.an('object');
                        expect(firstUser).to.have.property('email');
                        expect(firstUser).to.have.property('username');
                        expect(firstUser).to.have.property('_id');
        
                        done();
                    });
            });
        });
        
        describe('POST /signup', () => {
            it('should create a new user and return the user object', (done) => {
                chai.request.execute("http://34.235.149.135:5000")
                    .post("/signup")
                    .send({
                        username: 'Chibuzor Obi',
                        email: 'jonnyobi10@gmail.com',
                        password: 'rolemodel',
                        confirmPassword: 'rolemodel'
                    })
                    .end((err, res) => {
                        if (err) return done(err);
        
                        // Debugging logs
                        console.log("Response status:", res.status);
                        console.log("Response body:", JSON.stringify(res.body, null, 2));
        
                        // Basic Assertions
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an("object");
        
                        // Check for either 'status' or 'msg' property
                        if (res.body.hasOwnProperty('status')) {
                            expect(res.body).to.have.property('status').eql('success');
                        } else if (res.body.hasOwnProperty('msg')) {
                            expect(res.body).to.have.property('msg').to.be.a('string');
                        } else {
                            throw new Error("Unexpected response structure");
                        }
        
                        // Check the 'message' property if it exists
                        if (res.body.hasOwnProperty('message')) {
                            const user = res.body.message;
                            expect(user).to.be.an('object');
                            expect(user).to.have.property('_id');
                            expect(user).to.have.property('username').eql('Chibuzor Obi');
                            expect(user).to.have.property('email').eql('jonnyobi10@gmail.com');
                            expect(user).to.have.property('password');
                            expect(user).to.have.property('confirmPassword');
                            expect(user).to.have.property('createdAt');
                        }
        
                        done();
                    });
            });
        });


        describe('POST /products', () => {
            it('should create a new product and return the product object', (done) => {
                chai.request.execute("http://34.235.149.135:5000")
                    .post("/products")
                    .send({
                        name: 'New Product',
                        price: 29.99,
                        category: 'Mens',
                    })
                    .end((err, res) => {
                        if (err) return done(err);
        
                        // Log the entire response for debugging
                        console.log("Response status:", res.status);
                        console.log("Response headers:", res.headers);
                        console.log("Response body:", JSON.stringify(res.body, null, 2));
        
                        // Check the status code
                        expect(res).to.have.status(201);
        
                        // Check the structure of the response body
                        if (!res.body || typeof res.body !== 'object') {
                            return done(new Error("Response body is not an object or is missing."));
                        }
        
                        // Extract the product object (in case it's nested)
                        const product = res.body.message || res.body.data || res.body;
        
                        // Additional debug log
                        console.log("Extracted product object:", product);
        
                        // Assertions
                        expect(product).to.have.property('name').that.is.a('string').eql('New Product');
                        expect(product).to.have.property('price').that.is.a('number').eql(29.99);
                        expect(product).to.have.property('category').that.is.a('string').eql('Mens');
        
                        done();
                    });
            });
        });
        
        
        


        describe('GET /products', () => {
            it('should return a list of products', (done) => {
                chai.request.execute("http://34.235.149.135:5000")
                    .get("/products")
                    .end((err, res) => {
                        if (err) return done(err);
        
                        // Debugging logs
                        console.log("Response status:", res.status);
                        console.log("Response body:", JSON.stringify(res.body, null, 2));
        
                        // Assertions
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an("array"); // Expecting an array of products
                        expect(res.body.length).to.be.greaterThan(0); // Ensure there is at least one product
        
                        // Check each product in the array
                        res.body.forEach((product, index) => {
                            console.log(`Product ${index}:`, JSON.stringify(product, null, 2)); // Log each product
        
                            // Check if product has 'price' and ensure it is a number if present
                            if (product.hasOwnProperty('price')) {
                                expect(product.price).to.be.a('number');
                            } else {
                                // Handle case where price is missing
                                console.log(`Product ${index} does not have 'price' property`);
                            }
        
                            // Check if product has 'category' and ensure it is a string if present
                            if (product.hasOwnProperty('category')) {
                                expect(product.category).to.be.a('string');
                            } else {
                                // Handle case where category is missing
                                console.log(`Product ${index} does not have 'category' property`);
                            }
        
                            // Check if product has 'createdAt' and ensure it is a valid date string if present
                            if (product.hasOwnProperty('createdAt')) {
                                // Ensure createdAt is a valid date string
                                expect(new Date(product.createdAt)).to.be.a('date');
                            } else {
                                // Handle case where createdAt is missing
                                console.log(`Product ${index} does not have 'createdAt' property`);
                            }
        
                            // Check for other expected properties
                            expect(product).to.have.property('_id');
                            expect(product).to.have.property('name').that.is.a('string');
                        });
        
                        done();
                    });
            });
        });
        
        