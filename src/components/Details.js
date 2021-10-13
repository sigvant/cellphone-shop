import React from 'react'
import {ProductConsumer} from '../Context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

function Details() {
    return (
        <ProductConsumer>
            {   // this is required to consume without the useContext hook,
                // might need to look how to use the useContext hook later
                value => {
                    const {id, company, img, info, price, title, inCart} = value.detailProduct;
                    // we dstruc everything here after consuming
                    // 2 so now the detail is the detail of the product we clicked, after the product
                    // provider updated the infos with the methods we got there from the context
                    return (
                        <div className='container py-5'>
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* end title */}
                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img className='img-fluid' src={img} alt="product" />
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model : {title}</h2>
                                    <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
                                        made by : <span className='text-uppercase'>
                                            {company}
                                        </span>
                                    </h4>
                                    <h4 className='text-blue'>
                                        <strong>
                                            price : <span>$</span>
                                            {price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        some info about product:
                                    </p>
                                    <p className='text-muted lead'>
                                        {info}
                                    </p>
                                    {/* these are gonna be the buttons */}
                                    <div>
                                        <Link to='/'>
                                            <ButtonContainer>
                                                back to products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer
                                            // this is a prop from styled comps
                                            cart 
                                            disabled={inCart ? true : false}
                                            onClick={() => 
                                                        {
                                                            value.addToCart(id)
                                                            value.openModal(id)
                                                        }
                                                    }
                                            // this method was there all along, we just didnt dstruc it
                                            // it was created in the context file
                                        >
                                            {/* now we conditionally render the incart button */}
                                            {inCart ? 'inCart' : 'add to cart'}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </ProductConsumer>
    )
}

export default Details
