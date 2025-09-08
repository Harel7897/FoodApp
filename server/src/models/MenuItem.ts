import mongoose, { Schema, Document } from 'mongoose';


export interface IMenuItem extends Document {
name: string;
description?: string;
price: number; // in currency unit
imageUrl?: string;
category?: string;
isAvailable: boolean;
}


const MenuItemSchema = new Schema<IMenuItem>({
name: { type: String, required: true },
description: String,
price: { type: Number, required: true, min: 0 },
imageUrl: String,
category: String,
isAvailable: { type: Boolean, default: true }
}, { timestamps: true });


export const MenuItem = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);