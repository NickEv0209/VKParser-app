import { Product } from "../../redux/reducers/productReducer";
import UserProductItem from "./UserProductItem";

interface UserProductsProps {
  products: Product[]
}

const UserProductList = ({products}: UserProductsProps) => {
  if(products.length) {
    return (
      <div className="user__products">
        {products.map(product => {
          return <UserProductItem product={product} key={product.id}/>
        })}
      </div>
    )
  } else {
    return (
      <div className="user__products">
       <h2 className="user__products--empty">Товаров нет</h2>
      </div>
    )
  }
}

export default UserProductList;
