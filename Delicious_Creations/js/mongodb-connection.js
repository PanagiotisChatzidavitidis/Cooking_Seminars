const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string

// Database and collection names
const dbName = 'Delicious_Creations';

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    // Create a new MongoClient
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB');

    // Get the database
    const db = client.db(dbName);

    // Get the collection
    const collection = db.collection(collectionName);

    // Perform database operations
    // ...

    // Close the connection
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect to MongoDB
connectToMongoDB();