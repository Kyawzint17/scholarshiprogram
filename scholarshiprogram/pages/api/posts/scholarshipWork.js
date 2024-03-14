import dbConnect from '@/lib/db';
import WorkModel from '@/models/work';

export default async function handler(req, res) {
  try {
    await dbConnect();
    console.log("req.method: ", req.method);
    console.log('Handling request:', req.method);

    if (req.method === 'GET') {
      console.log('Fetching data from the "work" collection...');
      const docs = await WorkModel.find();
      console.log('Fetched data from the "work" collection:', docs);
      res.status(200).json(docs);
    } else if (req.method === 'POST') {
      console.log('Received POST request');
      console.log('Request Body:', req.body); // Log the request body
      console.log('Inserting data into the "work" collection...');

      try {
        // Ensure that req.body is an object before attempting to create a document
        if (typeof req.body === 'object' && !Array.isArray(req.body)) {
          const doc = await WorkModel.create(req.body);
          console.log('Inserted data into the "work" collection:', doc);
          res.status(201).json(doc);
        } else {
          console.error('Invalid request body format. Expected an object.');
          res.status(400).json({ error: 'Bad Request' });
        }
      } catch (createError) {
        if (createError.name === 'ValidationError') {
          // Handle Mongoose validation errors
          console.error('Validation error creating document:', createError.errors);
          res.status(400).json({ error: 'Validation Error', details: createError.errors });
        } else {
          console.error('Error creating document:', createError);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}