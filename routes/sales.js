import express from "express";
import { getAllSales , getSalesPorLocation , getSalePorId , masVendidos, buscarVentas} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/buscar" , async (req, res) => {
  const {location, purchaseMethod, couponUsed} = req.query;


  try {
    const ventasFiltradas = await buscarVentas({location, purchaseMethod, couponUsed});
    res.json(ventasFiltradas);
  } catch (error) {
    res.status(500).send("Error obteniendo las ventas filtradas");
  }
})

router.get("/location/:location", async (req, res) => {
  try {   
    const sales = await getSalesPorLocation(req.params.location);
    res.json(sales);
  } catch (error) {
    res.status(500).send("Error obteniendo las ventas por locacion");
  }

})


router.get("/:id", async (req, res) => {
  try {
    const sale = await getSalePorId(req.params.id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).send("No se encontro la venta");
    }
  } catch (error) {
    res.status(500).send("Error obteniendo la venta");
  }
});

router.get("/masvendidos", async (req, res) => {
  try {
    const vendidos = await masVendidos();
    res.json(vendidos);
  } catch (error) {
    res.status(500).send("Error obteniendo los mas vendidos");
  }
})

export default router;
