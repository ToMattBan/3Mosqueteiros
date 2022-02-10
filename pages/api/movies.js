import clientPromisse from '../../lib/mongodb'

export default async (req, res) => {
  const client = await clientPromisse;
  const db = client.db('sample_mflix');

  const movies = await db
    .collection("movies")
    .find({ "imdb.rating": { "$exists": true, "$ne": "" } })
    .sort({ "imdb.rating": -1 })
    .limit(20)
    .toArray();

  res.json(movies);
}