import { apiRequest } from "@/lib/api";

export interface ReviewItemInput {
  text: string;
}

export interface ReviewItem {
  id: string;
  text: string;
  createdAt: string;
}

export async function getReviews(): Promise<ReviewItem[]> {
  const data = await apiRequest<{ reviews: ReviewItem[] }>("api/reviews");
  return data.reviews;
}

export async function addReview(review: ReviewItemInput): Promise<ReviewItem> {
  const data = await apiRequest<{ review: ReviewItem }>("api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return data.review;
}


