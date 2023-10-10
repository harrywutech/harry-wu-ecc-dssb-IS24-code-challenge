const HttpError = require("../models/http-error");
const PRODUCTS = require("./DummyProducts.json");

const getProducts = (req, res, next) => {
  res.json({ products: PRODUCTS });
};

//GET PRODUCT BY ID
const getProductById = (req, res, next) => {
  const productId = req.params.productId;

  const product = PRODUCTS.find((p) => {
    return p.productId === productId;
  });

  if (!product) {
    throw new HttpError("Could not find a product for the provided id.", 404);
  }

  res.json({ product });
};

//POST PRODUCT
const createProduct = (req, res, next) => {
  const {
    productId,
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
    location,
  } = req.body;

  const createdProduct = {
    productId,
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
    location,
  };

  PRODUCTS?.push(createdProduct);

  res.status(201).json({ product: createdProduct });
};

//PUT PRODUCT
const updateProduct = (req, res, next) => {
  const {
    productId,
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
    location,
  } = req.body;

  const updateProductId = req.params.productId;

  const productIndex = PRODUCTS.findIndex(
    (p) => p.productId === updateProductId
  );

  if (productIndex === -1) {
    throw new HttpError("Could not find a product for the provided id.", 404);
  }

  const updatedProduct = {
    ...PRODUCTS[productIndex],
    productId,
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
    location,
  };

  PRODUCTS[productIndex] = updatedProduct;

  res.status(200).json({ product: updatedProduct });
};

// DELETE PRODUCT
const deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  const productIndex = PRODUCTS.findIndex(p => p.productId === productId);

  if (productIndex === -1) {
    throw new HttpError("Could not find a product for the provided id.", 404);
  }

  PRODUCTS.splice(productIndex, 1);

  res.status(200).json({ message: 'Product deleted successfully!' });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;