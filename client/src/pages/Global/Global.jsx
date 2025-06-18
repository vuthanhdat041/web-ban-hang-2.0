import React, { useState } from 'react';
import './Global.scss';



const Global = () => {


    return (

        <div className="homeContainer">
            <div className="homeImage">
                cai lon
            </div>

            <div className="twoProductText">
                2 dòng sản phẩm mang cảm hứng độc đáo
            </div>

            <div className="twoProductImages">
                <div className="twoProductImage">
                    cai lon
                </div>
                <div className="twoProductImage">
                    bac ki
                </div>
            </div>

            <div className="homeClassifyTexts">
                <div className='homeClassifyTextSignature'>THE SIGNATURE</div>
                <div className='homeClassifyTextHorizon'>THE HORIZON</div>
            </div>

            <div className="homeProductListContainer">

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Tongass Sunflower Ring Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 3.989.000₫
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                7 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Taiga Sunflower Bracelet Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 11.887.000₫
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                52 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Michigan Lotus Ring Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 6.150.000₫
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                14 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Yosemite Sunflower Pendant Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 6.459.000đ
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                26 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Bwindi Sunflower Earring Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 1.150.000₫
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                11 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Taiga Sunflower Chain Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 34.050.000₫
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                8 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Bosawas Sunflower Ring Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 3.989.000đ
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                12 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ProductItem">
                    <div className="ProductImageDiv">
                        Con cac
                    </div>
                    <div className="ProductInfoDiv">
                        <div className="ProductNameDiv">
                            Ontario Lotus Ring Helios Black Silver
                        </div>
                        <div className="ProductPriceDiv">
                            Từ 3.989.000đ
                        </div>
                        <div className="ProductRatingDiv">
                            <div className='ProductRatingStars'>
                                &#9733;&#9733;&#9733;&#9733;&#9733;
                            </div>
                            <div className="ProductRatingCount">
                                10 đánh giá
                            </div>
                            <button className="ProductBuyButton">
                                SELECT A SIZE
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="SliverContainer">
                <div className="SliverItem">
                    vai lon luon
                </div>
                <div className="SliverItem">
                    dit me may
                </div>
            </div>
            <div className="ThanksContainer">
                duc dep trai
            </div>
        </div>
    );
};

export default Global; 