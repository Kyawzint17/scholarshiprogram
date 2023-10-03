import { connectToDatabase } from "../../lib/db";

export default async (req, res) => {
  try {
    // Connect to the scholarship database
    const db = await connectToDatabase("scholarship"); // Replace "scholarship" with your actual database name

    // Specify the collection you want to query (e.g., "work")
    const collection = db.collection("work"); // Replace "work" with your collection name

    // Fetch data from the collection and convert it to an array
    const data = await collection.find().toArray();

    // Send the data as a JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
