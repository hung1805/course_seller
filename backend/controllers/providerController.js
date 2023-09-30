import asyncHandler from "express-async-handler";
import Provider from "../models/providerModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const getProviderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const provider = await Provider.findOne({ userId: id });
  const provider = await Provider.findOne({ userId: id });
  const user = await User.find({ _id: req.params.id }).select("-password");
  const info = {
    _id: provider._id,
    userId: user[0]._id,
    role: user[0].role,
    name: user[0].name,
    email: user[0].email,
    phone: provider.phone,
    description: provider.description,
    address: provider.address,
    image: provider.image,
  };

  if (provider) {
    res.status(200);
    res.json(info);
  } else {
    res.status(404);
    throw new Error("Provider Not Found");
  }
});

const getProviderRegisters = asyncHandler(async (req, res) => {
  const registers = await Provider.find({ status: "waiting" });
  if (registers) {
    res.status(200);
    res.json(registers);
  } else {
    res.status(404);
    throw new Error("No Providers");
  }
});

const getAllProviders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Provider.countDocuments({ ...keyword });
  const providers = await Provider.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ providers, page, pages: Math.ceil(count / pageSize) });
});
const registerProvider = asyncHandler(async (req, res) => {
  const data = req.body;
  // const { id } = data;

  // const exitProvider = await Provider.findOne({ userId });
  // if (exitProvider) {
  //   res.status(400);
  //   throw new Error("Provider exits!");
  // } else {

  // const exitProvider = await Provider.count({ userId: id }, { limit: 1 });
  // if (exitProvider) {
  //   res.status(400);
  //   throw new Error("Provider Exits");
  // } else {
  const newProvider = new Provider({
    userId: data.userId,
    name: data.name,
    email: data.email,
    description: data.description,
    status: "waiting",
    productItems: [],
    phone: data.phone,
    address: data.address,
    image: data.image,
  });
  const createdProvider = await newProvider.save();
  res.status(201).json(createdProvider);
  // }

  // }
  // console.log(id);
  // const exitProvider = Provider.find({ userId: id });
  // console.log(exitProvider);

  // if (exitProvider) {
  //   console.log(Yes);
  // res.status(400);
  // throw new Error("Already registed!");

  // if (newProvider) {
  //   res.status(201).json({
  //     _id: newProvider._id,
  //     name: newProvider.name,
  //     email: newProvider.email,
  //     phone: newProvider.phone,
  //     address: newProvider.address,
  //     description: newProvider.description,
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid Provider Data");
  // }
});

const addNewProduct = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);
  const product = new Product({ ...data });
  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

const getProductsByProviderId = asyncHandler(async (req, res) => {
  const id = req.originalUrl.split("/")[3];
  const data = await Product.find({ providerId: id });
  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("No Course");
  }
});

const updateProvider = asyncHandler(async (req, res) => {
  const id = req.originalUrl.split("/")[3];
  const provider = await Provider.findById(id);
  if (provider) {
    provider.status = req.body.status;
    const updatedProvider = await provider.save();
    res.status(200);
    res.json(updatedProvider);
  } else {
    res.status(404);
    throw new Error("Can not be updated");
  }
});
const dontAcceptProvider = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const provider = await Provider.findById(id);

  if (provider) {
    await provider.remove();
    res.status(200);
    res.json({ message: "Provider Request removed" });
  } else {
    res.status(404);
    throw new Error("No Request Found");
  }
});

export {
  getProviderById,
  getAllProviders,
  getProviderRegisters,
  registerProvider,
  addNewProduct,
  getProductsByProviderId,
  updateProvider,
  dontAcceptProvider,
};
