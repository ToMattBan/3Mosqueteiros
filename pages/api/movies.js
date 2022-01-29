import clientPromisse from '../../lib/mongodb'

export default async (req, res) => {
  const client = await clientPromisse;
  const db = client.db();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(movies);
}