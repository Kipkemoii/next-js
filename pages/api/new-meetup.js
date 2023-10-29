import { MongoClient } from 'mongodb';

async function handle(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://Kipkemoi:Den11476@cluster0.76eotyf.mongodb.net/nextjs?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne({ data });
    console.log(result);
    client.close();
    res.status(201).json({ message: 'meetup inserted' });
  }
}

export default handle;
