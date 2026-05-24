import productModel from "../models/productmodel.js"
import cloudinary from "cloudinary";
import  {getDataUri}from "../ulits/features.js"
export const getallProductsController = async (req,res)=>{
    try {
        //get all product code  user get routes
        const products = await productModel.find({})
        res.status(200).send({
            success:true,
            message:"get all product successsfully",
            products,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
      success: false,
      message: "error in get all product",
      error: error.message,
    });
    }
}
export const GetSingleProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    // validation
    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "Product ID is required",
      });
    }

    // find product
    const singleProduct = await productModel
      .findById(productId)
      .populate("category");

    // check if product exists
    if (!singleProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      singleProduct,
    });
  } catch (error) {
    console.log(error)
    //cast error coe object id
    if(error.name === "CaseError"){
    return res.status(500).send({
      success: false,
      message: "Error in get single product API",
      error: error.message,
    });
}
  }
};
 export const CreateProductController = async (req,res)=>{
 try {
     
    const {name,description,price,stock} = req.body
    
    //validation
    if(!name || !price || !description || !stock ){
         return res.status(404).send({
        success: false,
        message: "please provide all feilds",
      });

    }
    const file = getDataUri(req.file)
    if(!req.file){
        return res.status(500).send({
            success:false,
            message:"please provide product images"
        })
    }
    const cdb =  await cloudinary.v2.uploader.upload(file.content)
    const image ={   public_id:cdb.public_id,
    url: cdb.secure_url
    }
    const product =  await productModel.create({
        name,description,price,stock,images:[image],
    })
    res.status(201).send({
        success:true,
        message:"product create successfully",
        product,
    })
 } catch (error) {
     console.log(error)
        return res.status(500).send({
      success: false,
      message: "error in get all product",
      error: error.message,
    });
 }
 }
 export const UpdateProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);

    // ❌ FIXED VALIDATION
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }

    const { name, description, stock, price } = req.body;

    // update fields only if exist
    if (name) product.name = name;
    if (description) product.description = description;
    if (stock) product.stock = stock;
    if (price) product.price = price;

    await product.save();

    return res.status(200).send({
      success: true,
      message: "product updated successfully",
      product,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in update product api",
      error: error.message,
    });
  }
};

//delete product
export const DeleteProductController = async (req, res) => {
  try {
    // get product id from params
    const productId = req.params.id.trim();

    // find product
    const product = await productModel.findById(productId);

    // validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // delete product
    await productModel.findByIdAndDelete(productId);

    // response
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in delete product API",
      error: error.message,
    });
  }
};