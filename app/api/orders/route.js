import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const order = await request.json();

        if (!Array.isArray(order.items) || order.items.length === 0 ) {
            return NextResponse.json(
                { message: 'Your order is empty.' },
                { status: 400 }
            );
        }

        const totalPrice = order.items.reduce((total, item) => {
            if (
                typeof item.price !== 'number' ||
                typeof item.quantity !== 'number' ||
                item.price < 0 ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                return total;
            }

            return total + item.price * item.quantity;
        }, 0);
        
        return NextResponse.json({
            success: true, 
            message: 'Order received successfully.',
            totalPrice: totalPrice,
        });
    } catch {
        return NextResponse.json(
            { message: 'Unable to process your order.' },
            { status: 400 }
        );
        
    }
}