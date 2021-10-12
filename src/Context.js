import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products:storeProducts,
        detailProduct:detailProduct
    }

    handleDetail = () => {
        console.log('hello from detail')
    }

    addToCart = () => {
        console.log('hello from add to cart')
    }

    render() {
        return (
            // value here can be anything, like an object... like OUR object (data.js)
            <ProductContext.Provider value={
                { ...this.state, handleDetail:this.handleDetail, addToCart:this.addToCart }
            }>
                {/* we are passing the info from data.js plus some methods that will be handy later to be consumed */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}
