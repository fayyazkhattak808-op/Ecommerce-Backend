import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },

    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        
      },
    ],

    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "CARD", "ESEWA", "JAZZCASH", "BANK"],
      default: "COD",
    },

   user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},


    paidAt: Date,

    itemsPrice: {
      type: Number,
      required: true,
    },

    taxPrice: {
      type: Number,
      required: true,
    },

    shippingCharges: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

   

    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;