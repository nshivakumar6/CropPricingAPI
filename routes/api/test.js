const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../../config/db");
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

// @route     GET /api/cropprices/product/all
// @desc      GET ALL crop pricing listing
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/all', async (req, res) => {
    const { limit } = req.body;
    const query = `SELECT * FROM \`croppricing.CropPricing.prices\``;
    let options = {
        query: query,
        location: 'US',
    }

    if (limit) {
        options.query = query.concat(' LIMIT @limit');
        options.params = {limit: limit}
    }

    try {
        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
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
    const { product, limit } = req.body;
    const query = 
    `SELECT * FROM \`croppricing.CropPricing.prices\` WHERE LOWER(product) like LOWER(@product)`;
    let options = {
        query: query,
        location: 'US',
        params: {product: '%' + product + '%'}
    }

    if (limit) {
        options.query = query.concat(' LIMIT @limit');
        options.params.limit = limit
    }
    try {
        const [job] = await bigquery.createQueryJob(options);
        // console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route     GET /api/cropprices/variety
// @desc      GET crop pricing listing by variety, enter variety name in request body as 'variety'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/variety', [
    check('variety', 'Variety name required').not().isEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const { variety, limit } = req.body;

    const query = `SELECT * FROM \`croppricing.CropPricing.prices\` WHERE LOWER(variety) LIKE @variety`;
    let options = {
        query: query,
        location: 'US',
        params: {variety: '%' + variety + '%'}
    }

    if (limit) {
        options.query = query.concat(' LIMIT @limit');
        options.params.limit = limit
    }
    try {
        const [job] = await bigquery.createQueryJob(options);
        // console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route     GET /api/cropprices/category
// @desc      GET crop pricing listing by category, enter category name in request body as 'category'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/category', [
    check('category', 'Variety name required').not().isEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const { category, limit } = req.body;

    const query = `SELECT * FROM \`croppricing.CropPricing.prices\` WHERE LOWER(category) LIKE @category`;
    let options = {
        query: query,
        location: 'US',
        params: {category: '%' + category + '%'}
    }

    if (limit) {
        options.query = query.concat(' LIMIT @limit');
        options.params.limit = limit
    }
    try {
        const [job] = await bigquery.createQueryJob(options);
        // console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route     GET /api/cropprices/market
// @desc      GET crop pricing listing by market, enter market name in request body as 'market'
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/market', [
    check('market', 'Variety name required').not().isEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const { market, limit } = req.body;

    const query = `SELECT * FROM \`croppricing.CropPricing.prices\` WHERE LOWER(market) LIKE @market`;
    let options = {
        query: query,
        location: 'US',
        params: {market: '%' + market + '%'}
    }

    if (limit) {
        options.query = query.concat(' LIMIT @limit');
        options.params.limit = limit
    }
    try {
        const [job] = await bigquery.createQueryJob(options);
        // console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
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
//            (also note that limit MUST be the last argument in the request body)
// @access    Public (this will be the case for all until we have some form of auth)
router.get('/', async (req, res) => {
    const args = { category, variety, product, market} = req.body;
    const { limit } = req.body;
    if (args && Object.keys(args).length === 0 && args.constructor === Object) {
      
      return res.status(400).json({errors: [{
        "msg": "Category, variety, product, or market required",
        "param": "any",
        "location": "body"
      }]});
    }

    let query = `SELECT * FROM \`croppricing.CropPricing.prices\` WHERE `;
    let options = {
        query: query,
        location: 'US',
        params: {}
    }
    let count = 0;
    for (a in args) {
        if (count == 0) {
            options.query = options.query.concat(`LOWER(${a}) like LOWER(@${a}) `);
        } else if (a == "limit") {
            continue;  
        } else {
            options.query = options.query.concat(`AND LOWER(${a}) like LOWER(@${a}) `);
        }
        options.params[a] = args[a];
        count++;
    }
    if (limit) {
        options.query = options.query.concat('LIMIT @limit');
        options.params.limit = limit
    }
    try {
        const [job] = await bigquery.createQueryJob(options);
        // console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;
