using Microsoft.Extensions.Primitives;
using System.Security.Cryptography;
using System.Text;

namespace backend.Helpers
{
    public class VNPay
    {
        /// <summary>
        /// Tính HMAC-SHA512 và trả về hex lowercase.
        /// </summary>
        public static string ComputeHmacSHA512(string key, string data)
        {
            if (key is null) throw new ArgumentNullException(nameof(key));
            if (data is null) throw new ArgumentNullException(nameof(data));

            var keyBytes = Encoding.UTF8.GetBytes(key);
            var dataBytes = Encoding.UTF8.GetBytes(data);

            using (var hmac = new HMACSHA512(keyBytes))
            {
                var hash = hmac.ComputeHash(dataBytes);
                var sb = new StringBuilder(hash.Length * 2);
                foreach (var b in hash)
                {
                    sb.AppendFormat("{0:x2}", b);
                }
                return sb.ToString();
            }
        }

        /// <summary>
        /// Lấy IP client từ HttpRequest. Nếu header X-Forwarded-For có nhiều IP thì lấy phần tử đầu.
        /// Nếu không có header, dùng RemoteIpAddress.
        /// </summary>
        public static string GetIpAddress(HttpRequest request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));

            // X-Forwarded-For có thể chứa danh sách IP: "client, proxy1, proxy2"
            if (request.Headers.TryGetValue("X-Forwarded-For", out StringValues xff) && !StringValues.IsNullOrEmpty(xff))
            {
                var first = xff.ToString().Split(',').Select(s => s.Trim()).FirstOrDefault();
                if (!string.IsNullOrEmpty(first))
                    return first;
            }

            var remoteIp = request.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            return string.IsNullOrEmpty(remoteIp) ? "Unknown" : remoteIp;
        }

        /// <summary>
        /// Tạo chuỗi số ngẫu nhiên có độ dài len (dùng RandomNumberGenerator - cryptographically secure).
        /// </summary>
        public static string GetRandomNumber(int len)
        {
            if (len <= 0) throw new ArgumentOutOfRangeException(nameof(len), "len must be > 0");

            var sb = new StringBuilder(len);
            using (var rng = RandomNumberGenerator.Create())
            {
                var buffer = new byte[4];
                while (sb.Length < len)
                {
                    rng.GetBytes(buffer);
                    // convert 4 bytes -> uint and map sang 0-9
                    uint rnd = BitConverter.ToUInt32(buffer, 0);
                    sb.Append((rnd % 10).ToString());
                }
            }
            return sb.ToString(0, len);
        }

        /// <summary>
        /// Xây chuỗi query string sắp xếp theo key, bỏ param null/empty. Nếu encodeKey true thì mã hóa key.
        /// Dùng Uri.EscapeDataString để URL-encode theo UTF-8.
        /// </summary>
        public static string BuildPaymentQueryString(IDictionary<string, string> parameters, bool encodeKey)
        {
            if (parameters == null) throw new ArgumentNullException(nameof(parameters));

            var parts = parameters
                .Where(kv => !string.IsNullOrEmpty(kv.Value))
                .OrderBy(kv => kv.Key, StringComparer.Ordinal)
                .Select(kv =>
                {
                    var key = encodeKey ? Uri.EscapeDataString(kv.Key) : kv.Key;
                    var value = Uri.EscapeDataString(kv.Value);
                    return $"{key}={value}";
                });

            return string.Join("&", parts);
        }
    }
}
