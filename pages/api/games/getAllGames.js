import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db('games');

  var games = await db
    .collection("games")
    .find({})
    .sort({})
    .toArray();

  res.json(games);
}