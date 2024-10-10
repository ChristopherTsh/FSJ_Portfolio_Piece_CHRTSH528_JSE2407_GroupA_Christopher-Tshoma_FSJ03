// app/api/reviews.js

import { db } from '../../lib/firebaseConfig'; // Firebase configuration and initialization

/**
 * Handles the API request to add a review to a product
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - A JSON response
 */
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, reviewData } = req.body;

        // Validate product ID
        if (typeof productId !== 'string' || productId.trim() === '') {
            console.error('Received invalid product ID:', productId);
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        try {
            // Here, add the review to the local storage or a local data structure
            // After updating locally, push to Firebase
            const reviewsRef = db.collection('products').doc(productId).collection('reviews');
            await reviewsRef.add(reviewData);

            res.status(201).json({ message: 'Review added successfully' });
        } catch (error) {
            console.error('Error adding review to Firebase:', error);
            res.status(500).json({ error: 'Failed to add review to Firebase' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
