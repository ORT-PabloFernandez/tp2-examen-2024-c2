import getConnection from "./conn.js";
import { ObjectId } from "mongodb";

const DATABASE = "sample_supplies";
const MOVIES = "sales";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function obtenerVentaPorId(idVenta) {
  const connectiondb = await getConnection();
  
  if (!ObjectId.isValid(idVenta)) {
    throw new Error("El ID proporcionado no es válido.");
  }
  
  const venta = await connectiondb.db(DATABASE).collection(MOVIES).findOne({ _id: new ObjectId(idVenta)}); 
  return venta; 
}

async function obtenerVentasPorLocalizacion(ubicacionTienda){
  const connectiondb = await getConnection();
  const ventas = await connectiondb.db(DATABASE).collection(MOVIES).find({storeLocation: ubicacionTienda}).toArray();
  return ventas;
}

async function obtenerVentasPorFiltros(ubicacionTienda, metodoCompra, usoCupon){
  const connectiondb =  await getConnection();
  const query = {};

  if (ubicacionTienda) {
    query.storeLocation = ubicacionTienda;
  }
  if (metodoCompra) {
    query.purchaseMethod = metodoCompra;
  }
  if (usoCupon != undefined) {
    query.couponUsed = usoCupon === "true";
  }
  
  const ventas = await connectiondb.db(DATABASE).collection(MOVIES).find(query).toArray();
  return ventas;
}

async function obtenerProductoMasVendidos() {
  const connectiondb = await getConnection();
  const productosMasVendidos = await connectiondb.db(DATABASE).collection(MOVIES).aggregate([
    {$unwind: "$items"},
    {$group: { _id: "$items.name", totalVendido: { $avg: "$items.quantity"}}},
    {$sort: {totalVendido: -1}},
    {$limit: 10}   
  ]).toArray();
  
  return productosMasVendidos
}

async function obtenerClientesPorSatisfaccion(){
  const connectiondb = await getConnection();
  const clientes = await connectiondb.db(DATABASE).collection(MOVIES).aggregate([
    {$group: {_id: "$customer.email", satisfaccion: { $avg: "$customer.satisfaction"}}},
    { $sort: { satisfaccion: -1}}
  ]).toArray();

  return clientes;
}

export { getAllSales, obtenerVentaPorId, obtenerVentasPorLocalizacion, obtenerVentasPorFiltros, obtenerProductoMasVendidos, obtenerClientesPorSatisfaccion };
