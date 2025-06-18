import React from 'react';
import './MiniNavBar.scss';

const MiniNavBar = (props) => {
    const jewelryItems = [
        { category: 'VÒNG TAY', items: ['VÒNG TAY BẠC', 'VÒNG TAY THỜI TRANG'] },
        { category: 'NHẪN', items: ['NHẪN BẠC NAM', 'NHẪN THỜI TRANG'] },
        { category: 'DÂY CHUYỀN', items: ['DÂY CHUYỀN BẠC', 'MẶT DÂY CHUYỀN BẠC S925', 'DÂY CHUYỀN THỜI TRANG'] },
        { category: 'KHUYÊN TAI', items: ['KHUYÊN TAI BẠC NAM'] },
        { category: 'GOLD JEWELRY', items: ['GOLD JEWELRY'] },
        { category: 'HELIOS BLACK SILVER', items: ['LOTUS BLACK SILVER', 'SUNFLOWER BLACK SILVER'] },
    ];
    const giftItems = [
        { category: 'QÙA TẶNG CHO NAM', items: [] },
        { category: 'QÙA TẶNG CHO NỮ', items: [] },
        { category: 'QUÀ SINH NHẬT', items: [] },
        { category: 'COUPLE', items: ['NHẪN ĐÔI', 'DÂY CHUYỀN ĐÔI', 'KHUYÊN TAI ĐÔI'] },

    ];



    return (
        <div className={props.isGift ? "jewelry-list gift" : "jewelry-list"}>
            {props.isGift
                ? giftItems.map((item, index) => (
                    <div key={index} className="jewelry-category">
                        <h3>{item.category}</h3>
                        <ul>
                            {item.items.map((subItem, idx) => (
                                <li key={idx}>{subItem}</li>
                            ))}
                        </ul>
                    </div>
                ))
                : jewelryItems.map((item, index) => (
                    <div key={index} className="jewelry-category">
                        <h3>{item.category}</h3>
                        <ul>
                            {item.items.map((subItem, idx) => (
                                <li key={idx}>{subItem}</li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    );

}
export default MiniNavBar;
