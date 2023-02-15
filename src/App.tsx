import React, { useCallback, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const handleClick = useCallback((callBack: () => Promise<Good[]>) => {
    return async () => {
      try {
        setGoods(await callBack());
        setHasLoadingError(false);
      } catch (error) {
        setHasLoadingError(true);
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      {hasLoadingError && (
        <p>You catch some error</p>
      )}

      <button
        type="button"
        data-cy="all-button"
        onClick={handleClick(getAll)}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={handleClick(get5First)}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={handleClick(getRedGoods)}
      >
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};