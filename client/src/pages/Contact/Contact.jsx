import React from "react";
import "./styles.scss";

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="header">Liên hệ</h1>
      <div className="description">
        <strong>Bạn có thể liên hệ với Helios theo thông tin sau:</strong>
      </div>

      {/* Địa điểm 1 */}
      <div className="location">
        <ul>
          <li>
            <strong>Helios Hà Nội:</strong>
            <ul>
              <li>
                <p>Số 4 Ngõ 104 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội</p>
              </li>
              <li>
                <p>Liên hệ: 0964 302 899</p>
              </li>
            </ul>
          </li>
        </ul>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7505512209837!2d105.84319661042873!3d21.002634088595443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76bae0f995%3A0x20f3d8958ff11c6f!2zSGVsaW9zIC0gUGjhu6Uga2nhu4duIHRo4budaSB0cmFuZyAtIFbDsm5nIHRheSBuYW0sIGTDonkgY2h1eeG7gW4sIGtodXnDqm4gdGFpIG5hbSwgbmjhuqtuIHRo4budaSB0cmFuZw!5e0!3m2!1svi!2s!4v1737080011986!5m2!1svi!2s"
            width = "600"
            height = "450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>

      {/* Địa điểm 2 */}
      <div className="location">
        <ul>
          <li>
            <strong>Helios TP.Hồ Chí Minh:</strong>
            <ul>
              <li>
                <p>Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội</p>
              </li>
              <li>
                <p>Liên hệ: 0964 302 899</p>
              </li>
            </ul>
          </li>
        </ul>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7839.183745141028!2d106.668929!3d10.765904!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe02d070765%3A0x31aec7473085d831!2zSGVsaW9zIFPDoGkgR8Oybg!5e0!3m2!1svi!2sus!4v1737080258536!5m2!1svi!2sus"
            width = "600"
            height = "450"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;