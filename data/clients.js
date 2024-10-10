import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

async function getClients() {
    const connectiondb = await getConnection();
    const clients = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .find({}, { projection: {customer: 1, _id:0}})
      .sort({ "customer.satisfaction": -1})
      .toArray()
    return clients
}

export { getClients };