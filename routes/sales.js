import express from "express";
import { getAllSaless , getSalesById , getSalesByLocation , getTopSelling , getSatisfaccion} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  // Captura los nuevos parámetros de consulta
  const location = req.query.location;
  const purchaseMethod = req.query.purchaseMethod;
  const couponUsed = req.query.couponUsed;

  // Pasa los nuevos parámetros a la función getAllSales
  res.json(await getAllSaless(pageSize, page, location, purchaseMethod, couponUsed));
});

router.get("/:id", async (req, res) => {
  const sale = await getSalesById(req.params.id);
  if (!sale) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }
  res.json(sale);
});

router.get("/location/:location", async (req, res) => {
  const sales = await getSalesByLocation(req.params.location);
  res.json(sales);
});


router.get("/top-selling", async (req, res) => {
  try {
      const topProducts = await getTopSelling();
      res.json(topProducts);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener los productos más vendidos" });
  }
});



router.get("/customers/satisfaction", async (req, res) => {
  try {
      const customers = await getSatisfaccion();
      res.json(customers);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener los clientes." });
  }
});

export default router;
