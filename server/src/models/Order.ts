import mongoose, { Schema, Document } from 'mongoose';


interface IOrderItem {
menuItem: Schema.Types.ObjectId;
quantity: number;
priceAtPurchase: number;
}


export interface IOrder extends Document {
items: IOrderItem[];
customerName?: string;
phone?: string;
address?: string;
total: number;
status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';
}


const OrderSchema = new Schema<IOrder>({
items: [{
menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
quantity: { type: Number, required: true, min: 1 },
priceAtPurchase: { type: Number, required: true, min: 0 }
}],
customerName: String,
phone: String,
address: String,
total: { type: Number, required: true, min: 0 },
status: { type: String, enum: ['pending','preparing','ready','delivered','canceled'], default: 'pending' }
}, { timestamps: true });


export const Order = mongoose.model<IOrder>('Order', OrderSchema);