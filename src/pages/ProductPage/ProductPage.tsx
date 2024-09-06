import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import classes from './ProductPage.module.scss';
import { useFetchProductItem } from '../../hooks/useFetchProductItem';
import { Loader } from '../../ui/Loader/Loader';
import { useState } from 'react';
import { EditProductModal } from '../../components/EditProductModal/EditProductModal';
import classNames from 'classnames';

export const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const { product, setProduct, isLoading } = useFetchProductItem(params.id!);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const rootClasses = classNames(['container', classes.product])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && product && (
        <section className={rootClasses}>
          <EditProductModal product={product} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setProduct={setProduct} />
          <div className={classes.image}>
            <img
              src={product?.images[0]}
              alt={product?.title}
            />
          </div>
          <div className={classes.productInfo}>
            <div className={classes.title}>{product?.title}</div>
            <div className={classes.category}>Категория: {product?.category}</div>
            <div className={classes.description}>
              <div>Описание товара:</div> {product?.description}
            </div>
            <div>
              <span>Цена: </span>
              <span className={classes.priceValue}>${product?.price}</span>{' '}
            </div>
            <div className={classes.rating}></div>
          </div>
          <div className={classes.controls}>
            <Button type='primary'>
              <Link to={'/products'}>Вернуться к списку</Link>
            </Button>
            <Button
              onClick={showModal}
              type='primary'
            >
              Редактировать
            </Button>
          </div>
        </section>
      )}
    </>
  );
};
