
export const createSeatStream = (showtimeId: number) => {
  const baseUrl = "http://localhost:8080/api";

  return new EventSource(
    `${baseUrl}/seat-stream/${showtimeId}`
  );
};