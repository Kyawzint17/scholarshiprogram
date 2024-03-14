import dbConnect from '@/lib/db';
import WorkModel from '@/models/Work';

export default async function handler(req, res) {
  try {
    await dbConnect();
    console.log("req.method: ", req.method);
    console.log('Handling request:', req.method);

    if (req.method === 'GET') {
      // Your existing GET logic...
    } else if (req.method === 'POST') {
      // Your existing POST logic...
    } else if (req.method === 'DELETE') {
      console.log('Received DELETE request');
      console.log('Request Params:', req.query); // Log the request params

      try {
        const workId = req.query.id; // Assuming the ID is passed as a query parameter

        const result = await WorkModel.deleteOne({ _id: workId });

        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Successfully deleted' });
        } else {
          res.status(404).json({ message: 'Work not found' });
        }
      } catch (error) {
        console.error('Error deleting work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}