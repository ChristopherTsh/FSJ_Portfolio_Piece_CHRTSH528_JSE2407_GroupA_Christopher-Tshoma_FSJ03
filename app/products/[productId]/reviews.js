import { getFirestore } from "firebase-admin/firestore";
import admin from "../../../firebaseAdmin"; // Adjust the import path as necessary

const db = getFirestore(admin);

export default async function handler(req, res) {
  const { productId } = req.query;

  if (req.method === "POST") {
    const { reviewerName, comment, rating } = req.body;
    try {
      const newReview = {
        reviewerName,
        comment,
        rating,
        date: new Date().toISOString(),
      };
      await db.collection("products").doc(productId).update({
        reviews: admin.firestore.FieldValue.arrayUnion(newReview),
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    const { reviewId } = req.query;
    try {
      const productRef = db.collection("products").doc(productId);
      const productDoc = await productRef.get();
      const updatedReviews = productDoc.data().reviews.filter(
        (review) => review.id !== reviewId
      );
      await productRef.update({ reviews: updatedReviews });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
