import React, {Component} from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../../Context'
import CartList from './CartList'
import CartTotals from './CartTotals'


export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {
                        (value) => {
                            const {cart} = value;
                            if(cart.length > 0) {
                                return (
                                    <React.Fragment>
                                        <Title name='your' title='cart'/>
                                        <CartColumns/>
                                        {/* here we pass the value (the context provided) as a prop, instead
                                        of a arrow function \/ */}
                                        <CartList value={value}/>
                                        <CartTotals value={value} history={this.props.history}/>
                                    </React.Fragment>
                                )
                            } else {
                                return (<EmptyCart/>)
                            }
                        }
                    }
                </ProductConsumer>
                {/* we need to conditionally render this emptycart comp when cart is empty */}
            </section>
        )
    }
}
