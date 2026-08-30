import productsReducer, {
  setSearchTerm,
  setCategory,
  setPagination,
  clearError,
} from './productsSlice';

describe('productsSlice', () => {
  it('updates the search term and resets pagination to page 1', () => {
    const state = productsReducer(
      {
        products: [],
        total: 0,
        loading: false,
        error: null,
        searchTerm: '',
        category: '',
        pagination: { current: 3, pageSize: 10 },
      },
      setSearchTerm('mouse')
    );

    expect(state.searchTerm).toBe('mouse');
    expect(state.pagination.current).toBe(1);
  });

  it('updates the category filter and resets pagination to page 1', () => {
    const state = productsReducer(
      {
        products: [],
        total: 0,
        loading: false,
        error: null,
        searchTerm: '',
        category: '',
        pagination: { current: 2, pageSize: 10 },
      },
      setCategory('Accessories')
    );

    expect(state.category).toBe('Accessories');
    expect(state.pagination.current).toBe(1);
  });

  it('clears the error state', () => {
    const state = productsReducer(
      {
        products: [],
        total: 0,
        loading: false,
        error: 'Something went wrong',
        searchTerm: '',
        category: '',
        pagination: { current: 1, pageSize: 10 },
      },
      clearError()
    );

    expect(state.error).toBeNull();
  });

  it('updates pagination', () => {
    const state = productsReducer(
      {
        products: [],
        total: 0,
        loading: false,
        error: null,
        searchTerm: '',
        category: '',
        pagination: { current: 1, pageSize: 10 },
      },
      setPagination({ current: 2, pageSize: 20 })
    );

    expect(state.pagination).toEqual({ current: 2, pageSize: 20 });
  });
});
