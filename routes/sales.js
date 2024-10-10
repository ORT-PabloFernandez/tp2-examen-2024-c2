import express from "express";
import {
  getAllSales,
  getCustomersBySatisfaction,
  getSale,
  getSalesByFilters,
  getSalesMasVendidos,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    res.json(await getAllSales(pageSize, page));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const {
      storeLocation,
      purchaseMethod,
      couponUsed,
      pageSize = 0,
      page = 0,
    } = req.query;

    const pagina = parseInt(page);
    const tamanioPg = parseInt(pageSize);

    const filters = {};
    if (storeLocation) filters.storeLocation = storeLocation;
    if (purchaseMethod) filters.purchaseMethod = purchaseMethod;
    if (couponUsed !== undefined)
      filters.couponUsed = couponUsed.toLowerCase() === "true";

    res.json(await getSalesByFilters(filters, tamanioPg, pagina));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/masVendidos", async (req, res) => {
  try {
    res.json(await getSalesMasVendidos());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/customersSorted", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    res.json(await getCustomersBySatisfaction(pageSize, page));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await getSale(id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
