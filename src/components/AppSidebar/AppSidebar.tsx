import classes from './AppSidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { CategoryList } from '../CategoriesList/CategoryList';
import { useDebounce } from '../../hooks/useDebounce';

interface FilterSidebar {
  showOnlyFavorite: boolean;
  setShowOnlyFavorite: React.Dispatch<SetStateAction<boolean>>;
  setDebounceValue: React.Dispatch<SetStateAction<string>>;
}

export const AppSidebar = ({ showOnlyFavorite, setDebounceValue, setShowOnlyFavorite }: FilterSidebar) => {
  const [titleInput, setTitle] = useState('');

  const { debounceValue } = useDebounce(titleInput, 1000);
  const navigate = useNavigate();

  function toggleOnlyFavoriteProducts() {
    navigate('/products');
    setShowOnlyFavorite((prev) => !prev);
  }

  useEffect(() => {
    setDebounceValue(debounceValue);
  }, [debounceValue]);

  return (
    <aside className={classes.sidebar}>
      <Checkbox
        style={{ color: 'white' }}
        onChange={toggleOnlyFavoriteProducts}
        checked={showOnlyFavorite}
      >
        Только избранные
      </Checkbox>
      <Input
        placeholder='Введите название товара'
        onChange={(e) => setTitle(e.target.value)}
        value={titleInput}
      />
      <CategoryList setShowOnlyFavorite={setShowOnlyFavorite} />
    </aside>
  );
};
