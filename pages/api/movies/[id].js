import { ObjectId } from "mongodb";
import clientPromisse from '../../../lib/mongodb'

export default async (req, res) => {
  const id = new ObjectId(req.query.id);

  const client = await clientPromisse;
  const db = client.db();

  const movie = await db
    .collection("movies")
    .find({ _id: id })
    .toArray();

  res.json(movie);
}