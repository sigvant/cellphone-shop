import React from 'react'
import { Link } from 'react-router-dom'

function CartTotals({value}) {
    const { cartSubTotal, cartTax, cartTotal, clearCart } = value
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="" style={
                            {
                                display:'flex',
                                alignItems:'end',
                                flexDirection:'column',                                
                            }
                        }>
                        <Link to='/'>
                            <button 
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                type='button'
                                onClick={() => clearCart()}    
                            >
                                clear cart
                            </button>
                        </Link>
                        <h5>
                            <span className='text-title'>
                                subtotal :</span>
                            <strong>$ {cartSubTotal}</strong>
                        </h5>
                        <h5>
                            <span className='text-title'>
                                tax :</span>
                            <strong>$ {cartTax}</strong>
                        </h5>
                        <h5>
                            <span className='text-title'>
                                total :</span>
                            <strong>$ {cartTotal}</strong>
                        </h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CartTotals
