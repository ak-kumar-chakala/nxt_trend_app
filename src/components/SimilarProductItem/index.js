import './index.css'

const SimilarProductItem = props => {
  const {eachItem} = props

  const {imageUrl, title, price, brand, rating} = eachItem

  return (
    <li className="li-item">
      <img className="similar-image" src={imageUrl} alt="similar product" />
      <p className="title">{title}</p>
      <p className="brand">by {brand}</p>
      <div className="price-rating-container">
        <p className="price">Rs{price}/-</p>
        <div className="rating-container">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
