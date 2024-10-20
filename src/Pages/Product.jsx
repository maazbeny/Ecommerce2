import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrum from '../Components/BreadCrums/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { all_products } = useContext(ShopContext);
    const { productId } = useParams()
    const product = all_products.find((e) => e.id === Number(productId))

    return (
        <div>
            <BreadCrum product={product} />
            <ProductDisplay product={product} />
            <Descriptionbox />
            <RelatedProducts />
        </div>
    )
}

export default Product
