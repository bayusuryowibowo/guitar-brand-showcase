const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://bayusuryowibowo:${process.env.MONGODB_PASSWORD}@cluster0.pk1mfb6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

const getDb = () => {
  return database;
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = await client.db("sweetwater");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    database = db;
    return db;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { run, getDb };
