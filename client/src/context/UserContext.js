import { createContext, useEffect, useState } from "react";

// Khởi tạo Context
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    // Lấy user từ localStorage khi load trang
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Tạo biến `isAuthenticated` dựa trên `user`
    const isAuthenticated = !!user;

    // Hàm đăng nhập
    const loginContext = (user, token) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Lưu user vào localStorage
        localStorage.setItem("token", token);
    };

    // Hàm đăng xuất
    const logoutContext = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    // Cập nhật localStorage mỗi khi `user` thay đổi
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user,setUser, isAuthenticated, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
