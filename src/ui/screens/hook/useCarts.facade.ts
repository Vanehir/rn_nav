import { useState, useCallback, useMemo } from 'react';
import { PREFERRED_CARTS } from '../../../core/storage/types';
import { storage } from '../../../core/storage/storage';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface newCart {
  id: number;
  totalProducts: number;
  totalCost: number;
  totalQuantity: number;
  offers: number;
}

enum FilterType {
  DEFAULT = 'DEFAULT',
  INCREASING = 'INCREASING',
  DECREASING = 'DECREASING',
}

export const useCarts = () => {
  const [carts, setCarts] = useState<newCart[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [initialCarts, setInitialCarts] = useState<newCart[]>([]);
  const [sorting, setSorting] = useState<FilterType>(FilterType.DEFAULT);

  const refreshCarts = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/carts');
      const data = await response.json();
      const remappedData = data.carts.map((cart: Cart) => ({
        id: cart.id,
        totalProducts: cart.products.length,
        totalCost: cart.total,
        offers: cart.discountedTotal,
        totalQuantity: cart.totalQuantity,
      }));
      setCarts([...remappedData]);
      setInitialCarts([...remappedData]);
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.getItem(PREFERRED_CARTS);
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteIds(parsedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const addFavorite = useCallback(
    async (item: newCart) => {
      const updatedFavorites = favoriteIds.includes(item.id)
        ? favoriteIds.filter((id) => id !== item.id)
        : [...favoriteIds, item.id];

      setFavoriteIds(updatedFavorites);
      await storage.setItem(PREFERRED_CARTS, JSON.stringify(updatedFavorites));
    },
    [favoriteIds]
  );

  const onApplyFilter = useCallback(
    (filter: FilterType) => {
      setSorting(filter);
      if (filter === FilterType.DEFAULT) {
        setCarts(initialCarts);
        return;
      }
      const sortedCarts = carts.sort((a, b) => {
        if (filter === FilterType.INCREASING) {
          return a.totalQuantity - b.totalQuantity;
        }
        return b.totalQuantity - a.totalQuantity;
      });
      setCarts(sortedCarts);
    },
    [setSorting, carts, initialCarts, setCarts]
  );

  return {
    carts,
    favoriteIds,
    refreshCarts,
    loadFavorites,
    addFavorite,
    FilterType,
    sorting,
    onApplyFilter,
  };
};
