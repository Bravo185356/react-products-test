import { UploadOutlined } from '@ant-design/icons';
import classes from './CreateProductPage.module.scss';
import { Button, Form, Input, Select } from 'antd';
import { Upload } from 'antd';
import { useForm } from 'react-hook-form';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useMemo, useState } from 'react';
import { addNewProduct } from '../../store/productsSlice/productsSlice';
import { Product } from '../../types/types';
import classNames from 'classnames';

interface FormInput {
  title: string;
  description: string;
  price: string;
  category: string;
}

export const CreateProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    values: {
      title,
      description,
      price,
      category,
    },
  });

  const categorySelectOptions = useMemo(() => {
    return categories.map((category) => {
      return { value: category, label: category };
    });
  }, [categories]);

  function createNewProduct(data: FormInput) {
    const productBody: Product = {
      ...data,
      id: Date.now(),
      images: [''],
    };
    // Созданный продукт увидеть в списке не получится, т.к. при переходе на роут /products происходит fetch и данные в сторе обновляются
    dispatch(addNewProduct(productBody));
    reset();

    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
  }

  const rootClasses = classNames(['container', classes.createProductPage]);

  return (
    <section className={rootClasses}>
      <h2 className={classes.title}>Создание товара</h2>
      <Form
        name='wrap'
        labelWrap
        layout='vertical'
        style={{ width: 500 }}
        onFinish={handleSubmit(createNewProduct)}
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
          {errors.title && <div className={classes.errorMessage}>Обязательное поле</div>}
        </Form.Item>
        <Form.Item
          label='Описание товара'
          required
        >
          <TextArea
            {...register('description', { required: true })}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            value={description}
          />
          {errors.description && <div className={classes.errorMessage}>Обязательное поле</div>}
        </Form.Item>
        <Form.Item
          label='Категория'
          required
        >
          <Select
            {...register('category', { required: true })}
            options={categorySelectOptions}
            onChange={(value) => setCategory(value)}
            value={category}
          />
          {errors.category && <div className={classes.errorMessage}>Обязательное поле</div>}
        </Form.Item>
        <Form.Item
          label='Цена товара'
          required
        >
          <Input
            type='number'
            {...register('price', { required: true })}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: 150 }}
            value={price}
          />
          {errors.price && <div className={classes.errorMessage}>Обязательное поле</div>}
        </Form.Item>

        <Form.Item label='Изображение'>
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Button
          style={{ width: '100%' }}
          type='primary'
          htmlType='submit'
        >
          Создать
        </Button>
      </Form>
    </section>
  );
};
