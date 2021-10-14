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
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
        // they are all provided because we dstructed the state
    }

    componentDidMount() {
        this.storeProducts();
    }

    // the issue here is that we are passing values as reference, which prevents us from 
    // manipulating the data inside the app, since it will change the reference
    // to circunvent this isse we are going to use component did mount and a special method to
    // copy for real the data
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
                () => this.addTotals()
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

    // below here are the methods for the cart comp
    // ideally we extract and dstruc the state values
    // then we do some operations to them
    // then we update the state with the values and we call
    // a function to run after the the state updates, which usually is the addTotals()
    increment = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        },
            () => this.addTotals()
        )
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]

        product.count = product.count - 1;

        if(product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            },
                () => this.addTotals()
            )
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],                
            };
        },
            () => {
                this.addTotals();
            }
        )
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart: [],
            }
            // however, just doing this will not clear all necessary states
            // we should also set the products all over again from the data
        }, () => {
            this.storeProducts();
        })
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => subTotal += item.total)
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }


    render() {
        return (
            // value here can be anything, like an object... like OUR object (data.js)
            <ProductContext.Provider value={
                { 
                    ...this.state, 
                    handleDetail: this.handleDetail, 
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart
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
