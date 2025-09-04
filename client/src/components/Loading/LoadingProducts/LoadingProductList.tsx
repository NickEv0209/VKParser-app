import LoadingProductsItem from "./LoadingProductsItem"

interface LoadingProductsProps {
  count: number
}

const LoadingProductsList = ({count}: LoadingProductsProps) => {
  return (
    <div className="products">
      {Array.from({length: count}).map((_, index) => (
        <div className="product-item" key={index}>
          <LoadingProductsItem/>
        </div>
      ))}
    </div>
  )
}

export default LoadingProductsList
