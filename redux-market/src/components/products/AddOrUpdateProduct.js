import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Container } from 'reactstrap';
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from './ProductDetail';

function AddOrUpdateProduct ({products, categories, getProducts, getCategories, saveProduct, history, ...props}) {
    const [product, setProduct] = useState({...props.product});
    const [errors, setErrors] = useState({});

    useEffect(()=> {
        if(categories.length === 0) {
            getCategories();
        }
        setProduct({...props.product});
    },[categories.length, getCategories, props.product]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value,
        }));
       validate(name, value);
    }; 

    function validate(name, value) {
        if(value === "" && name==="productName") {
            setErrors(previousErrors => ({
                ...previousErrors,
                productName: "Ürün ismi Olmalıdır."
            }));
        } else {
            setErrors(previousErrors => ({
                ...previousErrors,
                productName: ""
            }));
        }
    }

    function handleSave (event) {
        event.preventDefault();
        saveProduct(product).then(()=> {
            history.push("/")
        })
    };

    return ( 
        <Container className="bg-light shadow p-3 rounded">
            <ProductDetail product={product} categories={categories} onChange={handleChange} onSave={handleSave} errors={errors}/>
        </Container>
    );

};

export function getProductById(products, productId) {
    let product = products.find(product => product.id == productId) || null;
    return product;
    
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.productId;
    const product = productId && state.productListReducer.length > 0 ? getProductById(state.productListReducer,productId) : {};
    return {
        product,
        products: state.productListReducer,
        categories: state.categoryListReducer,
    };
};

const mapDispatchToProps = {
    getCategories, saveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);