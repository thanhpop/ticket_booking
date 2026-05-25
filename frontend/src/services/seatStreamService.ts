
export const createSeatStream = (showtimeId: number) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  return new EventSource(
    `${baseUrl}/seat-stream/${showtimeId}`
  );
};