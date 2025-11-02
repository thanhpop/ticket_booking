namespace backend.Helpers
{
    public class ApiResponse<T>
    {
        public int Code { get; set; }
        public string Message { get; set; } = null!;
        public T? Data { get; set; }

        public ApiResponse() { }

        public ApiResponse(int code, string message, T? data)
        {
            Code = code;
            Message = message;
            Data = data;
        }

        public static ApiResponse<T> Success(T? data, string message = "Success", int code = 200)
            => new ApiResponse<T>(code, message, data);

        public static ApiResponse<T> Fail(string message, int code = 400)
            => new ApiResponse<T>(code, message, default);
    }
}
