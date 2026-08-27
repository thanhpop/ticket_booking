type Props = {
  homeUrl?: string;
  label?: string;
  message?: string;
};

export default function ForbiddenPage({
  homeUrl = "/",
  label = "Về trang chủ",
  message = "Bạn không có quyền truy cập vào trang này",
}: Props) {
  const goHome = () => {
    window.location.href = homeUrl;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <div style={{ textAlign: "center", padding: 24 }}>
        <h1 style={{ fontSize: 170, margin: 0, color: "#1e293b" }}>403</h1>
        <p
          style={{
            marginTop: 8,
            marginBottom: 16,
            fontSize: 18,
            color: "#475569",
          }}
        >
          {message}
        </p>
        <button
          onClick={goHome}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
