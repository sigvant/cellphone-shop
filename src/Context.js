import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        // just dstruc wont work because the objects are nested
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: true,
        modalProduct: detailProduct
    }

    componentDidMount() {
        this.storeProducts();
    }

    // but this method does the trick, it goes deeeeep and dstruc in steps
    storeProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(() => {
            return {products:tempProducts}
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id)
        return product
        
    }

    // ok so this method filters the array for only the id that we clicked in products
    // so it can get the information of the data.js matching the id
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }

    // this add to cart creates a temporary products and gets some info for the cart
    addToCart = (id) => {
        let tempProducts = [...this.state.products]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true
        product.count = 1
        const price = product.price
        product.total = price
        this.setState(
                {
                    products:tempProducts,
                    cart:[...this.state.cart, product]
                },
                () => console.log(this.state)
            )
            // here we fill the cart with the state, whatever was there, and with the product
            // in question as well
    }

    openModal = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return {
                // this will pass the information of the product to the modal when it is opening
                // which is get from the getItem() method, which finds the product via ID 
                // in the array of products
                modalProduct: product,
                modalOpen: true
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {
                modalOpen: false
            }
        })
    }

    // the issue here is that we are passing values as reference, which prevents us from 
    // manipulating the data inside the app, since it will change the reference
    // to circunvent this isse we are going to use component did mount and a special method to
    // copy for real the data

    render() {
        return (
            // value here can be anything, like an object... like OUR object (data.js)
            <ProductContext.Provider value={
                { 
                    ...this.state, 
                    handleDetail: this.handleDetail, 
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal
                }
            }>
                {/* we are passing the info from data.js plus some methods that will be handy 
                later to be consumed */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}
