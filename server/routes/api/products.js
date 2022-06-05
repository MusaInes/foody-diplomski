const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');

const Product = require('../../models/Product');
const User = require('../../models/User');

//@route    GET api/product
//@desc     Get all products
//@access   public
router.get('/', auth, async (req, res) => {
  try {
    const { before, after } = req.query;
    const products = await Product.find({ user: req.user.id, date: { $gte: after, $lte: before}});
    const selectedMeals = products.map(i => i.selectedMeal);
    const merged = [].concat.apply([], selectedMeals);
    const uniqueProducts = [...new Map(merged.map((item) => [item["id"], item])).values()];
    res.json(uniqueProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    GET api/products/id
//@desc     Get product by id
//@access   public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //check if product exist
    if (!product) {
      return res.status(404).json({ msg: 'Product does not exist' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    DELETE api/product/:id
//@desc     Delete product by id
//@access   private / Restricted
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.id).select('-password');

    if (!user.isAdmin || !user.isSuperAdmin) {
      res.status(401).json({ msg: 'Unauthorised access' });
    }

    if (!product) {
      return res.status(404).json({ msg: 'Product does not exist' });
    }

    await product.remove();

    res.status(200).json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    POST api/product
//@desc     Create new product
//@access   private / Restricted
router.post(
  '/',
  [ auth ],
  async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user.isAdmin) {
      res.status(401).json({ msg: 'Unauthorised access' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      selectedMeal
    } = req.body;

    //Build product object
    const productFields = {};

    productFields.user = req.user.id;

    if (selectedMeal) {
      productFields.selectedMeal = selectedMeal
    }

    try {
      let product = await Product.findById(req.body.id);
      if (product) {
        //update product
        product = await Product.findOneAndUpdate(
          { _id: req.body.id },
          { $set: productFields },
          { new: true, upsert: true }
        );
        return res.json(product);
      }

      product = new Product(productFields);
      await product.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
