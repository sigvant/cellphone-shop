import React from 'react'
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from '../Context'

function ProductList() {

    return (
        <React.Fragment>
            <div className="py-5">
                <div className="container">
                    <Title name='our' title='products'/>
                    <div className="row">
                        <ProductConsumer>
                            {
                                (value) => {
                                    return value.products.map(product => (
                                        // implicit return is nice
                                        <Product key={product.id} product={product}/>
                                    ))
                                }
                                // here we consume the data from the context properly
                            }
                        </ProductConsumer>
                    </div>
                </div>
            </div>
        </React.Fragment>
        // <Product/>
    )
}

export default ProductList
