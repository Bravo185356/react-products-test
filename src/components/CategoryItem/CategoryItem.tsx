import React, { SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import classes from './CategoryItem.module.scss';
import { resetPage } from '../../store/productsSlice/productsSlice';
import { useAppDispatch } from '../../store/hooks';
import classNames from 'classnames';

interface CategoryItemProps {
  category: string;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
  setShowOnlyFavorite: React.Dispatch<SetStateAction<boolean>>;
}

export const CategoryItem = ({ category, selectedCategory, setSelectedCategory, setShowOnlyFavorite }: CategoryItemProps) => {
  const dispatch = useAppDispatch();

  const categoryClasses = classNames([classes.link, selectedCategory === category && classes.selected]);

  function selectCategory(category: string) {
    dispatch(resetPage());
    setShowOnlyFavorite(false);
    setSelectedCategory(category);
  }

  return (
    <li key={category}>
      <Link
        to={`/products?category=${category}`}
        onClick={() => selectCategory(category)}
        className={categoryClasses}
      >
        {category}
      </Link>
    </li>
  );
};
