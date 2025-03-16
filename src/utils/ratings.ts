export const getCorrectRating = (rating: number): number =>
  Math.floor(rating >= 2 ? rating / 2 : rating);

export const getFractionDigitsRating = (rating: number | undefined): string => {
  if (rating === undefined) {
    return '0.0'; // 또는 적절한 기본값 반환
  }
  return rating.toFixed(1);
};

export const getRatingLabel = (rating: number): string => {
  const reviews: string[] = ['Bad', 'Okay', 'Good', 'Very Good', 'Amazing'];
  return reviews[rating - 1];
};
