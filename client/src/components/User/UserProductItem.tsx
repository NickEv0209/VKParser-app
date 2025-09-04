import { useDispatch } from "react-redux";
import { Button, IconButton, Tooltip } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { ProductsActionTypes } from "../../redux/reducers/productReducer";

import { ProductProps } from "../Product/ProductList";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const UserProductItem = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const originalProduct = useTypedSelector((state) =>
    state.products.products.find((prod) => prod.id === product.id)
  );

  const productIsChecked = originalProduct?.isChecked ?? false;

  const changeIsChecked = () => {
    dispatch({
      type: ProductsActionTypes.PRODUCT_TOGGLE_ACTIVE,
      payload: product,
    });
  };

  return (
    <div
      className={
        !productIsChecked
          ? "user__product-item"
          : "user__product-item user__product-item--checked"
      }
    >
      <div className="user__product-info">
        <img
          src={
            product.image === "Нет изображения"
              ? "https://i.ytimg.com/vi/xlNfQ8sItyY/maxresdefault.jpg"
              : product.image
          }
          className="user__product-image"
        />
        <div className="user__product-title-block">
          <h2 className="user__product-title">{product.title}</h2>
          <p className="user__product-description">
            Перейдите к товару чтобы узнать больше
          </p>
        </div>
      </div>
      <div className="user__product-buttons">
        <Button
          variant="text"
          endIcon={
            <ExpandCircleDownIcon style={{ transform: "Rotate(-90deg)" }} />
          }
          className="product__button"
          style={{ color: "var(--main-color)" }}
        >
          <a href={product.link} target="_blank" style={{ all: "unset" }}>
            Перейти
          </a>
        </Button>
        <Tooltip title="Отметить" placement="top" arrow>
          <IconButton onClick={changeIsChecked}>
            {productIsChecked ? (
              <StarIcon style={{ color: "var(--main-color)" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserProductItem;
