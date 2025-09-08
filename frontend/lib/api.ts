// API конфігурація для фронтенду
// API configuration for frontend

// Базовий URL для API запитів
// Base URL for API requests
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Функція для створення повного URL для API endpoint
// Function to create full URL for API endpoint
export const createApiUrl = (endpoint: string): string => {
	// Видаляємо початковий слеш якщо він є
	// Remove leading slash if present
	const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
	return `${API_URL}/${cleanEndpoint}`;
};

// Утиліта для виконання API запитів
// Utility for making API requests
export const apiRequest = async <T>(
	endpoint: string, 
	options: RequestInit = {}
): Promise<T> => {
	const url = createApiUrl(endpoint);
	
	const response = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`);
	}

	return response.json();
};

// Приклади використання:
// Examples of usage:
// const reviews = await apiRequest<Review[]>('api/reviews');
// const newReview = await apiRequest<Review>('api/reviews', {
//   method: 'POST',
//   body: JSON.stringify(reviewData)
// });
