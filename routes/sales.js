import express from "express";
import { getAllSales, obtenerVentaPorId, obtenerVentasPorLocalizacion, obtenerVentasPorFiltros, obtenerProductoMasVendidos, obtenerClientesPorSatisfaccion } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const idVenta = req.params.id;
  const venta = await obtenerVentaPorId(idVenta);
  if (venta) {
    res.json(venta);
  }else {
    res.status(404).send("Venta no encontrada");
  }
});

router.get("localizacion/:ubicacionTienda", async (req, res) => {
  const ubicacion = req.params.ubicacionTienda;
  res.json(await obtenerVentasPorLocalizacion(storeLocation, purchaseMethod, couponUsed));
});

router.get("/filtro", async(req, res) => {
  const {storeLocation, purchaseMethod, couponUsed} = req.query;
  res.json(await obtenerVentasPorFiltros(storeLocation, purchaseMethod, couponUsed));
});

router.get("/productos-mas-vendidos", async (req, res) => {
  res.json(await obtenerProductoMasVendidos());
});

router.get("/clientes-por-satisfaccion", async (req, res) => {
  res.json(await obtenerClientesPorSatisfaccion());
});

export default router;
