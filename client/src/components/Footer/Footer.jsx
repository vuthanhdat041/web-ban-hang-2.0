
import './Footer.scss'

const products = [{ name: 'Bwindi Sunflower Earring Helios Black Silver', price: '1,211.000₫', reviews: 5, buttonText: 'SELECT A SIZE', }, { name: 'Taiga Sunflower Chain Helios Black Silver', price: '34,240.000₫', reviews: 0, buttonText: 'ADD TO CART', }, { name: 'Bosawas Sunflower Ring Helios Black Silver', price: 'from 5,102.000₫', reviews: 3, buttonText: 'SELECT A SIZE', }, { name: 'Ontario Lotus Ring Helios Black Silver', price: 'from 5,617.000₫', reviews: 8, buttonText: 'SELECT A SIZE', },];

const Footer = () => {
    return (

        <div className='footerContainer'>
            <div className='footerColumn'>
                <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
                <p>HELIOS tạo ra những chế tác độc đáo...</p>
                <p><strong>CÔNG TY TNHH SUN ROCK</strong></p>
                <p>Mã số thuế: 0109889605</p>
                <p>Địa chỉ: Số 4, ngõ 104 Lê Thanh Nghị...</p>
                <p>Hotline hỗ trợ:</p>
                <p>- Hà Nội: 039.327.8668</p>
                <p>- Hồ Chí Minh: 0794.302.899</p>
            </div>
            <div className='footerColumn'>
                <h3>CHĂM SÓC KHÁCH HÀNG</h3>
                <ul>
                    <li>Hướng dẫn thanh toán</li>
                    <li>Giao hàng</li>
                    <li>Chính sách bảo hành</li>
                    <li>Chính sách đổi trả</li>
                    <li>Chính sách bảo mật</li>
                    <li>Bảng giá phí điều chỉnh sản phẩm</li>
                    <li><a href="#">Feedback</a></li>
                </ul>
            </div>
            <div className='footerColumn'>
                <h3>VỀ CHÚNG TÔI</h3>
                <ul>
                    <li>Câu chuyện của Helios</li>
                    <li>Hệ thống cửa hàng</li>
                    <li>Tuyển dụng</li>
                    <li>Membership by Helios</li>
                </ul>
            </div>
            <div className='footerColumn'>
                <h3>DÀNH CHO KHÁCH HÀNG</h3>
                <ul>
                    <li>Tin tức</li>
                    <li>Blog</li>
                    <li>Hướng dẫn bảo quản sản phẩm</li>
                    <li>Hướng dẫn đo Size</li>
                    <li>Cơ hội hợp tác cùng Helios</li>
                </ul>
            </div>
        </div>
    )

}

export default Footer;
