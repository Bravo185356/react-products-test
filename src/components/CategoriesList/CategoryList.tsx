import React, { SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import classes from './CategoryList.module.scss';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { useSearchParams } from 'react-router-dom';

interface CategoryListProps {
  setShowOnlyFavorite: React.Dispatch<SetStateAction<boolean>>;
}

export const CategoryList = ({ setShowOnlyFavorite }: CategoryListProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams] = useSearchParams();

  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    if (searchParams.has('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
  }, [searchParams]);
  
  return (
    <>
      <h4>Категории товаров:</h4>
      <ul className={classes.categoryList}>
        {categories?.map((category) => {
          return (
            <CategoryItem
              key={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setShowOnlyFavorite={setShowOnlyFavorite}
              category={category}
            />
          );
        })}
      </ul>
    </>
  );
};
