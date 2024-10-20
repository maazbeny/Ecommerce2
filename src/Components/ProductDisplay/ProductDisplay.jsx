import React, { useContext } from 'react';
import './ProductDisplay.css';
import { Link } from 'react-router-dom';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ProductDisplay = (props) => {
    const { product } = props;
    const { cartItems, updateCartItem } = useContext(ShopContext)
    const [quantity, setQuantity] = useState(cartItems[product.id] || 0);
    useEffect(() => {
        setQuantity(0); 
    }, [product]);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateCartItem(product.id, newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartItem(product.id, newQuantity);
        }
    };
    return (
        <div id='product-display' className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                                  <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122 )</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    Experience ultimate comfort and style with our Comfy Jacket. Crafted from premium materials, this jacket offers a cozy, soft feel perfect for any occasion. Its modern design ensures you stay warm while looking effortlessly chic. Ideal for layering, the Comfy Jacket is your go-to for casual outings or relaxing at home. Stay snug, stay stylish with the Comfy Jacket.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size:</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <div className="quantity-conatiner">
                    <h1>Quantity:</h1>
                    <div className="quantity-box">
                        <FontAwesomeIcon onClick={handleIncrease} icon={faPlus} />
                        <p>{quantity}</p>
                        <FontAwesomeIcon onClick={handleDecrease} icon={faMinus} />
                    </div>
                </div>
                <div className='add-buy-btn'>
                    <Link to='/cart'>
                        <button className="add-to-cart" onClick={() => {
                            updateCartItem(product.id, quantity);
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth' // For smooth scrolling
                            });
                        }}>
                            ADD TO CART
                        </button>
                    </Link>
                    <button className='buy-btn'>BUY IT NOW</button>
                </div>

                <p className="productdisplay-right-category">
                    <span>Category:</span> Women, T-Shirt, Crop Top.
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags:</span> Modern, Latest.
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
