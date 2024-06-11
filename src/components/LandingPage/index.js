import { Component } from "react"
import { v4 as uuidv4 } from "uuid"
import Cookies from 'js-cookie'
import { IoSearch } from "react-icons/io5"
import { BsFilterRight } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
import Popup from "reactjs-popup"
import ProductCard from "../ProductCard"
import "./index.css"

const products = [
    { id: uuidv4(), name: "Laptop", price: 999.99, quantity: 10 },
    { id: uuidv4(), name: "Smartphone", price: 599.99, quantity: 20 },
    { id: uuidv4(), name: "Tablet", price: 399.99, quantity: 15 },
    { id: uuidv4(), name: "Smartwatch", price: 199.99, quantity: 50 },
    { id: uuidv4(), name: "Headphones", price: 149.99, quantity: 30 },
    { id: uuidv4(), name: "Speaker", price: 89.99, quantity: 25 },
    { id: uuidv4(), name: "Monitor", price: 249.99, quantity: 12 },
    { id: uuidv4(), name: "Keyboard", price: 79.99, quantity: 40 },
    { id: uuidv4(), name: "Mouse", price: 49.99, quantity: 60 },
    { id: uuidv4(), name: "External Hard Drive", price: 129.99, quantity: 22 },
    { id: uuidv4(), name: "Webcam", price: 69.99, quantity: 18 },
    { id: uuidv4(), name: "Printer", price: 199.99, quantity: 10 },
    { id: uuidv4(), name: "Router", price: 99.99, quantity: 35 },
    { id: uuidv4(), name: "Projector", price: 299.99, quantity: 8 },
    { id: uuidv4(), name: "VR Headset", price: 499.99, quantity: 7 },
    { id: uuidv4(), name: "Gaming Console", price: 399.99, quantity: 14 },
    { id: uuidv4(), name: "Action Camera", price: 299.99, quantity: 20 },
    { id: uuidv4(), name: "E-Reader", price: 129.99, quantity: 25 },
    { id: uuidv4(), name: "Smart Home Hub", price: 149.99, quantity: 30 },
    { id: uuidv4(), name: "Drone", price: 699.99, quantity: 5 }
];

const sortbyOptions = [
    {
      optionId: "PRICE_HIGH",
      displayText: "Price (High-Low)",
    },
    {
      optionId: "PRICE_LOW",
      displayText: "Price (Low-High)",
    },
];

class LandingPage extends Component {

    state = { 
        productsList: products, 
        searchValue: "", 
        resultantSearchValue: "", 
        activeOptionId: sortbyOptions[0].optionId,
        newProductName: "",
        newProductPrice: "",
        newProductQuantity: "",
    }
     
    onSearch = event => this.setState({searchValue: event.target.value})

    onSubmitForm = event => {
        event.preventDefault();
        const {searchValue} = this.state;
        this.setState({resultantSearchValue: searchValue})
    }

    onChangeSortby = event => {
        this.setState({ activeOptionId: event.target.value })
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    getSortedProducts = productsList => {
        const { activeOptionId } = this.state
        if (activeOptionId === "PRICE_HIGH") {
            return productsList.sort((a, b) => b.price - a.price)
        }
        return productsList.sort((a, b) => a.price - b.price)
    }

    onEdit = obj => {
        const {productsList} = this.state
        const updatedList = productsList.map(eachItem => {
            if(eachItem.id === obj.id){
                return obj
            }
            return eachItem
        })
        this.setState({productsList: updatedList})
    }

    onDelete = id => {
        const {productsList} = this.state
        const updatedList = productsList.filter(eachItem => eachItem.id!==id)
        this.setState({productsList: updatedList})
    }


    addProduct = (event, close) => {
        event.preventDefault();
        const { newProductName, newProductPrice, newProductQuantity, productsList } = this.state;
        const newProduct = {
            id: uuidv4(),
            name: newProductName,
            price: parseFloat(newProductPrice),
            quantity: parseInt(newProductQuantity, 10)
        }
        this.setState({
            productsList: [...productsList, newProduct],
            newProductName: "",
            newProductPrice: "",
            newProductQuantity: "",
        },
            () => {
                close()
            }
        )
        
    }

    getCreateCard = (close) => {
        const { newProductName, newProductPrice, newProductQuantity } = this.state;
        return (
            <form className="create-form" onSubmit={(event) => this.addProduct(event, close)}> 
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
                <button type="submit" className="add-btn">Add</button>
            </form>
        )
    }

    onLogout = () => {
      Cookies.remove("token")
      const {history} = this.props
      history.replace('/login')
    }

    render() {
        const { productsList, resultantSearchValue, activeOptionId } = this.state
        
        const filteredProducts = productsList.filter(eachItem => eachItem.name.toLowerCase().includes(resultantSearchValue.toLowerCase()))
        
        const sortedProducts = this.getSortedProducts(filteredProducts)

        return(
            <div className="landing-page-container">
                <div className="header">
                  <h1 className="heading">Products Cart</h1>  
                  <button onClick={this.onLogout} className="create-btn">Logout</button>
                </div>
                <form className="form-container" onSubmit={this.onSubmitForm}>
                <div className="search-bar">
                  <input onChange={this.onSearch} type="search" className="search-input" placeholder="Search..."/>
                  <button type="submit" className="search-btn"><IoSearch /></button>
                </div>
                </form>
                <div className="products-header">
                  <div className="sort-by-container">
                    <BsFilterRight className="sort-by-icon" />
                    <p className="sort-by">Sort by</p>
                    <select
                      className="sort-by-select"
                      value={activeOptionId}
                      onChange={this.onChangeSortby}
                    >
                      {sortbyOptions.map(eachOption => (
                        <option
                          key={eachOption.optionId}
                          value={eachOption.optionId}
                          className="select-option"
                        >
                          {eachOption.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Popup
                    modal
                    trigger={
                        <button type="button" className="create-btn">+Create New</button>
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
                </div>
                <ul className="products">
                    {sortedProducts.map(eachItem => <ProductCard item={eachItem} onDelete={this.onDelete} onEdit={this.onEdit} key={eachItem.id} />)}
                </ul>
            </div>
        )
    }
}

export default LandingPage
