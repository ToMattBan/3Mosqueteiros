import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db('games');

  var mosqueteiros = await db
    .collection("mosqueteiros")
    .find({})
    .sort({})
    .toArray();

  res.json(mosqueteiros);
}