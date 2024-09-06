import classes from './Pagination.module.scss';
import { Button } from 'antd';
import { LIMIT_ITEMS_PER_PAGE } from '../../constants';
import { useAppDispatch } from '../../store/hooks';
import { setNextPage, setPrevPage } from '../../store/productsSlice/productsSlice';

interface PaginationProps {
  total: number;
  skip: number;
}

export const Pagination = ({ total, skip }: PaginationProps) => {
  const dispatch = useAppDispatch();
  
  function nextPage() {
    dispatch(setNextPage());
  }

  function prevPage() {
    dispatch(setPrevPage());
  }

  return (
    <div className={classes.pagination}>
      <Button
        style={{ width: 250 }}
        type='primary'
        onClick={prevPage}
        disabled={skip === 0}
      >
        Предыдущая страница
      </Button>
      <Button
        style={{ width: 250 }}
        type='primary'
        onClick={nextPage}
        disabled={skip + LIMIT_ITEMS_PER_PAGE >= total}
      >
        Следующая страница
      </Button>
    </div>
  );
};
