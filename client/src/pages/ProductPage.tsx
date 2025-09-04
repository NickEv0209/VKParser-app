import { useDispatch } from "react-redux";
import { Badge, Button, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import ProductList from "../components/Product/ProductList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { TabActionTypes } from "../redux/reducers/tabReducer";
import { PaginationActionTypes } from "../redux/reducers/paginationReducer";

import './styles/ProductPage.css'


const ProductPage = () => {
  const dispatch = useDispatch()

  const {products} = useTypedSelector(state => state.products)
  const {all, active, checked} = useTypedSelector(state => state.tab)
  const {itemsPerPage} = useTypedSelector((state) => state.Pagination)


  const tabToggleAll = () => {
    dispatch({type: TabActionTypes.TAB_TOGGLE_ALL})
  }
  const tabToggleChecked = () => {
    dispatch({type: TabActionTypes.TAB_TOGGLE_CHECKED})
  }
  const tabToggleActive = () => {
    dispatch({type: TabActionTypes.TAB_TOGGLE_ACTIVE})
  }


  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: PaginationActionTypes.SET_ITEMS_PER_PAGE,
      payload: Number(event.target.value)
    });
  };


  return (
    <div className="product-page">
      <div className="product-page__title-block">
        <div className="product-page__title-container">
          {/* <h1 className="product-page__title">Список товаров</h1> */}
          <FormControl>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={String(itemsPerPage)}
              onChange={handleChange}
              autoWidth
              style={{height: "100%"}}
            >
              <MenuItem value='Кол-во товаров' disabled>
                <em>Кол-во товаров на странице</em>
              </MenuItem>
              <MenuItem value={5}>5 Товаров на странице</MenuItem>
              <MenuItem value={10}>10 Товаров на странице</MenuItem>
              <MenuItem value={15}>15 Товаров на странице</MenuItem>
              <MenuItem value={20}>20 Товаров на странице</MenuItem>
              <MenuItem value={25}>25 Товаров на странице</MenuItem>
              <MenuItem value={30}>30 Товаров на странице</MenuItem>
              <MenuItem value={35}>35 Товаров на странице</MenuItem>
              <MenuItem value={40}>40 Товаров на странице</MenuItem>
              <MenuItem value={45}>45 Товаров на странице</MenuItem>
              <MenuItem value={50}>50 Товаров на странице</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="sorted-buttons">
          <Button
            style={all ? {color: 'var(--main-color)'} : {color: 'var(--desc-color)'}}
            onClick={tabToggleAll}
          >
            Все
          </Button>
          <Badge badgeContent={products.filter(product => product.isChecked).length} color="error">
            <Button
              style={checked ? {color: 'var(--main-color)'} : {color: 'var(--desc-color)'}}
              onClick={tabToggleChecked}
            >
              Отмеченные
            </Button>
          </Badge>
          <Button
            style={active ? {color: 'var(--main-color)'} : {color: 'var(--desc-color)'}}
            onClick={tabToggleActive}
          >
            Активные
          </Button>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductPage;
