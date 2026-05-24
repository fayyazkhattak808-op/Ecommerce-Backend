import categoryModel from "../models/categorymodel.js";

export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required",
      });
    }

    // create category
    const category = await categoryModel.create({
      name,

    });

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create category",
      error: error.message,
    });
  }
};


//get all category
export const GetALLCategoyController = async (req,res)=>{
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
      success: true,
      message: "All categories fetched successfully",
      total: categories.length,
      categories,
    });
        
    } catch (error) {
         console.log(error);
    return res.status(500).send({ 
      success: false,
      message: "Error in create category",
      error: error.message,
    });
    }
} 
export const deletecateController =  async (req,res)=>{
    try {
        const catId = req.params.id.trim()
        //validation 
        const category = await categoryModel.findById(catId)
        await categoryModel.findByIdAndDelete(catId)
        res.status(200).send({
            success:true,
            message:"CAT DEL SUCCESSFULLY"
        })
    } catch (error) {
          console.log(error);
    return res.status(500).send({ 
      success: false,
      message: "Error in create category",
      error: error.message,
    });
    }
}


export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required",
      });
    }

    // find category
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // update category
    category.name = name;

    await category.save();

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in update category API",
      error: error.message,
    });
  }
};