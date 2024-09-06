import { Product } from '../../types/types';
import { DeleteOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteProduct } from '../../store/productsSlice/productsSlice';
import React, { useMemo, useState } from 'react';
import { addFavoriteProduct, deleteFromFavorite } from '../../store/favoriteProductsSlice/favoriteProductsSlice';
import classNames from 'classnames';
import classes from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  skip: number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [toggleLikeBtn, setToggleLikeBtn] = useState(false);

  const favoriteProducts = useAppSelector((state) => state.favoriteProducts.favorites);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isFavorite = useMemo(() => {
    return favoriteProducts.find((favoriteProduct) => favoriteProduct.id === product.id);
  }, [favoriteProducts, product.id]);

  const likeIconClasses = classNames(classes.iconFlat, toggleLikeBtn && classes.active);
  const favoriteIconClasses = classNames(classes.iconFlat, isFavorite && classes.active);

  function toggleLike(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    setToggleLikeBtn((prev) => !prev);
  }

  function toggleFavorite(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(deleteFromFavorite(product.id));
    } else {
      dispatch(addFavoriteProduct(product));
    }
  }

  function deleteProductItem(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  }

  return (
    <article
      tabIndex={0}
      className={classes.productCard}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className={classes.productImg}>
        <img
          src={product.images[0]}
          alt={product.title}
        />
      </div>
      <div className={classes.productInfo}>
        <div className={classes.title}>{product.title}</div>
        <div className={classes.description}>{product.description}</div>
        <div className={classes.controls}>
          <div className={classes.topControls}>
            <DeleteOutlined
              tabIndex={0}
              onClick={(e) => deleteProductItem(e)}
              className={classes.icon}
            />
          </div>
          <LikeOutlined
            onClick={(e) => toggleLike(e)}
            tabIndex={0}
            className={likeIconClasses}
          />
          <StarOutlined
            onClick={(e) => toggleFavorite(e)}
            tabIndex={0}
            className={favoriteIconClasses}
          />
        </div>
      </div>
    </article>
  );
};
