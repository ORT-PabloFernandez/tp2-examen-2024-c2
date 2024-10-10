import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

async function topTenProducts() {
    const connectiondb = await getConnection();
    const topten = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .aggregate([
        {$unwind: "$items"},
        {
          $group: {
            _id: "$items.name",
            cantidadVendida: { $sum: "$items.quantity"}
          }
        },
        {$sort: { cantidadVendida: -1 }},
        {$limit: 10}
      ])
      .toArray()
    return topten
}

export { topTenProducts }