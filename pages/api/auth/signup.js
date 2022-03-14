import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    // Only POST req
    if (req.method === "POST") {

        // Get credentials from body
        const { username, password } =req.body;

    } else {
        //Response for other than POST method
        res.status(500).json({ err: 'Must be POST request!' });
    }
}