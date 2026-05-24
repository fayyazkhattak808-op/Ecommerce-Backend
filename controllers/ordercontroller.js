import { stripe } from "../index.js"
import orderModel from "../models/ordermodels.js"




export const CreateOrderContorller =async (req,res)=>{
    try {
        const {shippingInfo,orderItems, paymentMethod,itemsPrice, 
    shippingCharges, taxPrice,totalAmount} = req.body
    console.log(req.body)
    //validation 
    if(!shippingInfo ||!orderItems || !paymentMethod  ||  !itemsPrice || 
    !shippingCharges || !taxPrice || !totalAmount){
        return res.status(404).send({
            success:false,
            message:"please provide all feilds"
        })
    };
    const order = await orderModel.create({
    shippingInfo,orderItems, paymentMethod,itemsPrice, 
    shippingCharges, taxPrice,totalAmount
    });
    //stock update:
  
     await order.save();
res.status(201).send({
    success:true,
    message: "order placed successfuly",
    order,
})
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create order API",
      error: error.message,
    });
    }
}

//get all order 
export const GetallOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });

    // check empty array
    if (orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Your order data",
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all order API",
      error: error.message,
    });
  }
};
// getorder by id
export const  GetMyOrderController = async(req,res)=>{
    try {
        const {id} = req.params
        const order = await orderModel.findOne({
            _id:id,
            user:req.user._id
        })
        if(!order){
            return res.status(404).send({
        success: false,
        message: "No orders found",
      });
        }
        res.status(200).send({
            success:true,
            message:"order get successfully",
            order,
        })

    } catch (error) {
  console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all order API",
      error: error.message,
    });
    }
}
//payment method controller 
export const PaymentController = async (req, res) => {
  try {
    // ✅ correct spelling
    const { totalAmount } = req.body;

    console.log(totalAmount);
    console.log(req.body);

    // validation
    if (!totalAmount) {
      return res.status(400).send({
        success: false,
        message: "totalAmount is required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(totalAmount) * 100, // Stripe uses cents
      currency: "usd",
    });

    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Payment API",
      error: error.message,
    });
  }
};
