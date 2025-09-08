export type MenuItem = {
_id: string;
name: string;
description?: string;
price: number;
imageUrl?: string;
category?: string;
isAvailable: boolean;
};


export type OrderItemInput = { menuItemId: string; quantity: number };