import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation(); // Giữ lại toàn bộ đối tượng location
  const pathname = location.pathname; // Lấy pathname từ location

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang mỗi khi pathname thay đổi
  }, [pathname]); // Chạy lại khi pathname thay đổi

  return null; // Không cần render gì
}
