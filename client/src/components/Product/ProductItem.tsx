import { Button, IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";

import { ProductsActionTypes } from "../../redux/reducers/productReducer";

import { ProductProps } from "./ProductList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { memo } from "react";

const ProductItem = memo(({ product }: ProductProps) => {
  const dispatch = useDispatch();
  const { checked } = useTypedSelector((state) => state.tab);

  const changeIsChecked = () => {
    dispatch({
      type: ProductsActionTypes.PRODUCT_TOGGLE_ACTIVE,
      payload: product,
    });
  };

  const userName = product.user.name.split(" ")[0];

  return (
    <div
      className={
        product.isChecked && !checked ? "product product--active" : "product"
      }
    >
      <div className="product__image">
        <img
          src={
            product.image === "Нет изображения"
              ? "https://i.ytimg.com/vi/xlNfQ8sItyY/maxresdefault.jpg"
              : product.image
          }
          alt="product-image"
        />
      </div>
      <div className="product__content">
        <div className="product__info">
          <div className="product__user">
            <img src={product.user.avatar} className="product-user__avatar" />
            <p className="product-user__name">{userName}</p>
          </div>
          <div className="product__info--buttons">
            <Tooltip title="Отметить" placement="top" arrow>
              <a style={{ all: "unset" }}>
                <IconButton onClick={changeIsChecked}>
                  {product.isChecked ? (
                    <StarIcon style={{ color: "var(--main-color)" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip title="Перейти в сообщения" placement="top" arrow>
              <a
                target="_blank"
                href={product.user.link}
                style={{ all: "unset" }}
              >
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="product__title-block">
          <h2 className="product__title">{product.title}</h2>
          <p className="product__description">
            Перейдите к товару, чтобы узнать больше
          </p>
        </div>
        <div className="product__button-block">
          <a
            target="_blank"
            href={product.link}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="text"
              endIcon={
                <ExpandCircleDownIcon style={{ transform: "Rotate(-90deg)" }} />
              }
              className="product__button"
              style={{ color: "var(--main-color)" }}
            >
              Перейти
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;
