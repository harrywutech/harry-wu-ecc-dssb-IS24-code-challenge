/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /api/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Could not find a product for the provided id.
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Could not find a product for the provided id.
 *
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully!
 *       404:
 *         description: Could not find a product for the provided id.
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productId
 *         - productName
 *         - productOwnerName
 *         - developers
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *         - location
 *       properties:
 *         productId:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         productOwnerName:
 *           type: string
 *           description: The name of the product owner
 *         developers:
 *           type: string
 *           description: The name of the developer
 *         scrumMasterName:
 *           type: string
 *           description: The name of the scrum master
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the project
 *         methodology:
 *           type: string
 *           description: The methodology used in the project
 *         location:
 *           type: string
 *           description: The URL of the product
 *       example:
 *         productId: "41"
 *         productName: "New Product from Swagger"
 *         productOwnerName: "Harry"
 *         developers: [Harry, Sally, Fred]
 *         scrumMasterName: "Scrum Master 1"
 *         startDate: "2023/01/01"
 *         methodology: "Agile"
 *         location: "https://github.com/bcgov/api-guidelines"
 */

const express = require("express");

const productsControllers = require("../controllers/products-controllers");

const router = express.Router();

router.get("/", productsControllers.getProducts);

router.get("/:productId", productsControllers.getProductById);

router.post("/", productsControllers.createProduct);

router.put("/:productId", productsControllers.updateProduct);

router.delete("/:productId", productsControllers.deleteProduct);

module.exports = router;
