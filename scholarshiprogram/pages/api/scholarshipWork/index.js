import dbConnect from '@/lib/db';
import WorkModel from '@/models/Work';
import formidable from 'formidable';

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

      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form data:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log('Parsed form fields:', fields);
        console.log('Parsed form files:', files);

        console.log('Inserting data into the "work" collection...');

        try {
          // Ensure that fields is an object before attempting to create a document
          if (typeof fields === 'object' && !Array.isArray(fields)) {
            const doc = await WorkModel.create(fields);
            console.log('Inserted data into the "work" collection:', doc);
            return res.status(201).json(doc);
          } else {
            console.error('Invalid request body format. Expected an object.');
            return res.status(400).json({ error: 'Bad Request' });
          }
        } catch (createError) {
          console.error('Error creating document:', createError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
