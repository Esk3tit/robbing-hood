import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

export default async function handler(req, res) {
    // Only POST req
    if (req.method === 'POST') {

        // Get credentials from body
        const { first, last, email, password } = req.body;

        // Validate
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid credentials' });
            return;
        }

        // Connect to DB using clientPromise (await)
        const client = await connectToDatabase();
        const db = client.db();

        // Query for existing user with email
        const existingUser = await db.collection('users').findOne({ email: email });

        // If user exists then send error (close db connection as well)
        if(existingUser) {
            res.status(422).json({ err: 'User exists already!' });
            client.close();
            return;
        }

        // Hash password for security
        const hashedPassword = await hashPassword(password);

        const result = await db.collection('users').insertOne({
            firstName: first,
            lastName: last,
            email: email,
            password: hashedPassword
        });

        // Send success res and close db connection
        res.status(201).json({ message: 'Created user!', ...result });
        client.close();

    } else {
        //Response for other than POST method
        res.status(500).json({ err: 'Must be POST request!' });
    }
}