import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0; // Use product ID instead of index
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_products, setAll_product] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((resp) => resp.json()).then((data) => setAll_product(data))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`, 
                    'Content-Type': 'application/json',
                },
                body: " ", 
            })
                .then((resp) => resp.json())
                .then((data) => setCartItems(data));
        }
    }, [])



    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    };


    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 0) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                return prev;
            }

        });
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }), 
            })
                .then((resp) => resp.json())
                .then((data) => console.log(data));
        }

    }
    const updateCartItem = (itemId, quantity) => {
        if (quantity === 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: quantity }));

        }
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }), 
            })
                .then((resp) => resp.json())
                .then((data) => console.log(data));
        }

    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_products,
        cartItems,
        addToCart,
        removeFromCart, updateCartItem
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
