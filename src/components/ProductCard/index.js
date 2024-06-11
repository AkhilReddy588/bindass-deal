import React, { Component } from "react"
import Popup from 'reactjs-popup'
import { IoMdClose } from "react-icons/io"

import './index.css'

class ProductCard extends Component {
    state = {
        newProductName: this.props.item.name,
        newProductPrice: this.props.item.price,
        newProductQuantity: this.props.item.quantity,
    };

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    editProduct = (event, close) => {
        event.preventDefault()
        const {onEdit, item} = this.props
        const {id} = item
        const {newProductName, newProductPrice, newProductQuantity} = this.state
        const newObj = {
            id,
            name: newProductName, 
            price: newProductPrice,
            quantity: newProductQuantity,
        }
        onEdit(newObj)
        close()
    }

    getCreateCard = (close) => {
        const { newProductName, newProductPrice, newProductQuantity } = this.state
        return (
            <form className="create-form" onSubmit={(event) => this.editProduct(event, close)}> 
                <div className="create-fields">
                    <label>Product Name</label><br/>
                    <input value={newProductName} name="newProductName" onChange={this.handleInputChange} type="text" />
                </div>
                <div className="create-fields">
                    <label>Price</label><br/>
                    <input value={newProductPrice} name="newProductPrice" onChange={this.handleInputChange} type="number" />
                </div>
                <div className="create-fields">
                    <label>Quantity</label><br/>
                    <input value={newProductQuantity} name="newProductQuantity" onChange={this.handleInputChange} type="number" />
                </div>
                <button type="submit" className="add-btn">Edit</button>
            </form>
        )
    };

    render() {
        const { name, price, quantity, id } = this.props.item
        const {onDelete} = this.props
        return (
            <li className='product-card'>
                <div>
                  <h1 className='product-name'>{name}</h1>
                  <p>Rs.{price}</p>
                  <p className='quantity'>quantity: {quantity}</p>
                </div>
                <div className='card-btns'>
                    <Popup
                      modal
                      trigger={
                        <button type='button' className='edit-btn'>Edit</button>
                      }
                    >
                      {close => (
                        <>
                          <div className="create-section">
                                <button type="button" className="closeBtn" onClick={() => close()}>
                                  <IoMdClose />
                                </button>
                                {this.getCreateCard(close)}
                            </div>
                        </>
                      )}
                    </Popup>
                    <button onClick={() => onDelete(id)} className='delete-btn'>Delete</button>
                </div>
            </li>
        )
    }
}

export default ProductCard
