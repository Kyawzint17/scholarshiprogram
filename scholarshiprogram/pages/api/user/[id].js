import dbConnect from "@/lib/db";
import UserModel from "@/models/user";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        // Get only one document
        const doc = await UserModel.findOne({ _id: id })
        res.status(200).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}