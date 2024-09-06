import React, { SetStateAction, useState } from 'react';
import { Product } from '../../types/types';
import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from '../../store/hooks';
import { editProductItem } from '../../store/productsSlice/productsSlice';
import { useForm } from 'react-hook-form';
import classes from './EditProductModal.module.scss';

interface EditProductModalProps {
  product: Product;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  setProduct: React.Dispatch<SetStateAction<Product | null>>;
}

interface FormInput {
  title: string;
  description: string;
  price: string | number;
}

export const EditProductModal = ({ product, isModalOpen, setIsModalOpen, setProduct }: EditProductModalProps) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    values: {
      title,
      description,
      price,
    },
  });

  function editProduct(data: FormInput) {
    const editedProductItem = {
      ...product,
      ...data,
    };

    reset();
    setProduct(editedProductItem);
    dispatch(editProductItem(editedProductItem));
    setIsModalOpen(false);
  }

  function closeModal() {
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);

    setIsModalOpen(false);
  }

  return (
    <Modal
      centered
      title='Редактирование продукта'
      open={isModalOpen}
      onOk={handleSubmit(editProduct)}
      onCancel={closeModal}
    >
      <Form
        name='wrap'
        labelWrap
        layout='vertical'
      >
        <Form.Item
          label='Название товара'
          required
        >
          <Input
            {...register('title', { required: true })}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {errors.title && <div className={classes.errorMessage}>Поле не может быть пустым</div>}
        </Form.Item>
        <Form.Item
          label='Описание товара'
          required
        >
          <TextArea
            {...register('description', { required: true })}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={4}
          />
          {errors.description && <div className={classes.errorMessage}>Поле не может быть пустым</div>}
        </Form.Item>
        <Form.Item
          label='Цена'
          required
        >
          <Input
            {...register('price', { required: true })}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type='number'
          />
          {errors.price && <div className={classes.errorMessage}>Поле не может быть пустым</div>}
        </Form.Item>
      </Form>
    </Modal>
  );
};
