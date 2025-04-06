const { Favorite } = require("../models/favorite");
const { Product } = require("../models/product");

const addToFavorite = async (req, res) => {
  try {
    const userId = req.headers.id;
    const productId = req.params.id;
    const favorite = await Favorite.findOne({ userId });
    let newFavorite;
    if (!favorite) {
      newFavorite = new Favorite({
        userId,
        products: [productId],
      });
    } else {
      const currentIndex = favorite.products.findIndex(
        (product) => product._id.toString() === productId
      );
      if (currentIndex !== -1)
        return res
          .status(400)
          .json({ msg: "This Product is Already Exist in Favorites" });
      favorite.products.push(productId);
    }
    await newFavorite.save();
    return res.status(201).json({ msg: "Done" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteFromFavorites = async (req, res) => {
  try {
    const userId = req.headers.id;
    const productId = req.params.id;
    const favorite = await Favorite.findOne({ userId });
    const currentIndex = favorite.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (currentIndex === -1)
      return res.status(404).json({ msg: "This Product is not Found" });
    favorite.products.splice(currentIndex, 1);
    await favorite.save();
    return res.status(200).json({ msg: "Product is Deleted form Favorites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  addToFavorite,
  deleteFromFavorites,
};
