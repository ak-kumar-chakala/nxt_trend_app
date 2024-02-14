import {Component} from 'react'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    selectedProduct: '',
    similarProductsList: [],
    count: 1,
    status: 'initial',
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({
      status: 'loading',
    })

    const {match} = this.props

    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      this.setState({
        status: 'success',
      })
      const data = await response.json()

      const selectedProductData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        description: data.description,
        price: data.price,
      }

      const similarProductsData = data.similar_products.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        title: eachItem.title,
        style: eachItem.style,
        price: eachItem.price,
        description: eachItem.description,
        brand: eachItem.brand,
        totalReviews: eachItem.total_reviews,
        rating: eachItem.rating,
        availability: eachItem.availability,
      }))

      console.log(similarProductsData)

      this.setState({
        selectedProduct: selectedProductData,
        similarProductsList: similarProductsData,
      })
    } else {
      this.setState({
        status: 'failure',
      })
    }
  }

  onClickIncrease = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onClickDecrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  renderSelectedProduct = () => {
    const {selectedProduct, count} = this.state
    console.log(selectedProduct)
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = selectedProduct
    return (
      <div className="selected-container">
        <Header />
        <div className="selected-product">
          <img className="selected-image" alt="product" src={imageUrl} />
          <div className="details-description-container">
            <h1>{title}</h1>
            <p>Rs {price}/-</p>

            <div className="rating-container">
              <p>{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p>{totalReviews} Reviews</p>
            <p>{description}</p>
            <p>Available: {availability}</p>
            <p>Brand: {brand}</p>
            <div className="count-container">
              <button
                data-testid="minus"
                onClick={this.onClickDecrease}
                className="count-button"
                type="button"
                aria-label="Increase Count"
              >
                <BsDashSquare />
              </button>
              <p>{count}</p>
              <button
                data-testid="plus"
                onClick={this.onClickIncrease}
                className="count-button"
                type="button"
                aria-label="Increase Count"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-to-cart-button" type="button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderSimilarProducts = () => {
    const {similarProductsList} = this.state
    return (
      <ul className="ul-list">
        {similarProductsList.map(eachItem => (
          <SimilarProductItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div>
      <Header />
      <div data-testid="loader" className="primedeals-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  onClickShoppingButton = () => {
    const {history} = this.props

    history.push('/products')
  }

  renderFailureView = () => (
    <div>
      <Header />
      <div className="failure-container">
        <img
          className="failure-image"
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        />
        <h1>Product Not Found</h1>
        <button
          onClick={this.onClickShoppingButton}
          className="continue-shopping-button"
          type="button"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  render() {
    const {status} = this.state

    console.log(status)

    switch (status) {
      case 'loading':
        return <div>{this.renderLoader()}</div>
      case 'success':
        return (
          <div>
            {this.renderSelectedProduct()}
            {this.renderSimilarProducts()}
          </div>
        )

      case 'failure':
        return <div>{this.renderFailureView()}</div>
      default:
        return null
    }
  }
}

export default ProductItemDetails
