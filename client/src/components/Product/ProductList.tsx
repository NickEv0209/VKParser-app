import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Product,
  ProductsActionTypes,
} from "../../redux/reducers/productReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TabActionTypes } from "../../redux/reducers/tabReducer";

import ProductItem from "./ProductItem";

import "./Product.css";
import LoadingProductsList from "../Loading/LoadingProducts/LoadingProductList";
import Paginate from "../Pagination/Paginate";
import { setCurrentPage } from "../../redux/reducers/paginationReducer";
import NotSearchProducts from "./NotSearchProducts";
export interface ProductProps {
  product: Product;
}

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ProductsActionTypes.FETCH_PRODUCT });
  }, [dispatch]);

  const tabToggleAll = () => {
    dispatch({ type: TabActionTypes.TAB_TOGGLE_ALL });
  };

  const { isError, isLoading, products } = useTypedSelector((state) => state.products);
  const { checked, active } = useTypedSelector((state) => state.tab);
  const query = useTypedSelector((state) => state.search.query);
  const { currentPage, itemsPerPage, totalItems } = useTypedSelector((state) => state.Pagination)

  useEffect(() => {
    // @ts-expect-error is necessary
    dispatch(setCurrentPage(1))
  }, [checked, active, dispatch, query, totalItems])


  if (isLoading) return <LoadingProductsList count={10}/>;
  if (isError) return <h1>Error</h1>;

  const filterByQuery = (products: Product[]) => {
    if (!query.trim()) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const paginate = (items: Product[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    const container = document.querySelector('.products')
    // @ts-expect-error is necessary
    dispatch(setCurrentPage(page));
    container?.scrollTo({
      top: 0,
    });
  };

  const renderProducts = (filteredProducts: Product[]) => {
    const paginatedProducts = paginate(filteredProducts, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

    if (paginatedProducts.length === 0 && currentPage > 1) {
      handlePageChange(currentPage - 1);
    }

    return (
      <>
        <div className="products">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="product-item">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
        <div className="products__paginate">
          <Paginate 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  }

  if (checked) {
    const checkedProducts = filterByQuery(
      products.filter((product) => product.isChecked)
    );
    if (checkedProducts.length) {
      return renderProducts(checkedProducts);
    } else {
      tabToggleAll();
    }
  }

  if (active) {
    const activeProducts = filterByQuery(
      products.filter((product) => !product.isChecked)
    );
    if (activeProducts.length) {
      return renderProducts(activeProducts);
    } else {
      tabToggleAll();
    }
  }

  const filteredProducts = filterByQuery(products);
  if(filteredProducts.length) {
    return renderProducts(filteredProducts)
  } else {
    return <NotSearchProducts />
  }
};

export default ProductList;
