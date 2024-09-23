import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
      await client.connect();
      const db = client.db('dars-visualizer');
      const collection = db.collection('extract-data');

      await collection.updateOne(
        { usage_stats: true },
        { $inc: { totalUses: 1 } },
        { upsert: true }
      );

      res.status(200).json({ message: 'Usage count incremented' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to increment usage count' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}