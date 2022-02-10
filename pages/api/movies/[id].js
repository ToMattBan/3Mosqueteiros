import { ObjectId } from "mongodb";
import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  const id = new ObjectId(req.query.id);

  const client = await clientPromise;
  const db = client.db('sample_mflix');

  const movie = await db
    .collection("movies")
    .find({ _id: id })
    .toArray();

  res.json(movie);
}