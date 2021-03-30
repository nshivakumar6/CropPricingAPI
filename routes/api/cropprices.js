const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../../config/db");
const Pricing = require("../../models/Pricing");
const { post } = require("./users");

// @route     GET /api/cropprices/product/all
// @desc      GET ALL crop pricing listing
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/product/all', async (req, res) => {
  try {
    pool.query(
      'SELECT * FROM price',
      (err, qres) => {
        if (err) {
          throw err;
        }
        res.status(200).json(qres.rows);
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     GET /api/cropprices/product
// @desc      GET crop pricing listing by product, enter product name in request body as 'product'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/product', [
  check('product', 'Product name required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const { product } = req.body;
  try {
    pool.query(
      'SELECT * FROM price WHERE LOWER(product) like LOWER($1)',
      ['%' + product + '%'],
      (err, qres) => {
        if (err) {
          throw err;
        }
        res.status(200).json(qres.rows);
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     GET /api/cropprices/variety
// @desc      GET crop pricing listing by variety, enter variety name in request body as 'variety'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/variety', [
  check('variety', 'Product name required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const { variety } = req.body;
  try {
    pool.query(
      'SELECT * FROM price WHERE LOWER(variety) like LOWER($1)',
      ['%' + variety + '%'],
      (err, qres) => {
        if (err) {
          throw err;
        }
        res.status(200).json(qres.rows);
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     GET /api/cropprices/category
// @desc      GET crop pricing listing by category, enter category name in request body as 'category'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/category', [
  check('category', 'Product name required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const { category } = req.body;
  try {
    pool.query(
      'SELECT * FROM price WHERE LOWER(category) like LOWER($1)',
      ['%' + category + '%'],
      (err, qres) => {
        if (err) {
          throw err;
        }
        res.status(200).json(qres.rows);
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     GET /api/cropprices/market
// @desc      GET crop pricing listing by market, enter market name in request body as 'market'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/market', [
  check('market', 'Product name required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const { market } = req.body;
  try {
    pool.query(
      'SELECT * FROM price WHERE LOWER(market) like LOWER($1)',
      ['%' + market + '%'],
      (err, qres) => {
        if (err) {
          throw err;
        }
        res.status(200).json(qres.rows);
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     GET /api/cropprices/
// @desc      GET anything based on parameters in the request body
//            (this is a bit experimental -- it seems to work though)
//            (this needs to be tested further)
//            (unsure about package.unit, package.weight, since these have a dot in them)
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/', async (req, res) => {
  const args = { category, variety, product, market} = req.body;
  if (args && Object.keys(args).length === 0 && args.constructor === Object) {
    
    return res.status(400).json({errors: [{
      "msg": "Category, variety, product, or market required",
      "param": "any",
      "location": "body"
    }]});
  }
  let queryIndex = 1;
  let query = 'SELECT * FROM price WHERE ';
  let queryArgs = [];
  for (key in args) {
    if (queryIndex == 1) {
      query = query.concat(`LOWER(${key}) like LOWER($${queryIndex})`);
      queryArgs.push('%' + args[key] + '%');
    } else {
      query = query.concat(` AND LOWER(${key}) like LOWER($${queryIndex})`);
      queryArgs.push('%' + args[key] + '%');
    }
    queryIndex++;
  }
  try {
    pool.query(
      query,
      queryArgs,
      (err, qres) => {
        if (err) {
          throw err;
        }
        res.status(200).json(qres.rows);
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
