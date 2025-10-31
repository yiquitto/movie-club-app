export const initialState = {
  loading: true,
  error: null,
  shows: [],
  query: 'friends', // Varsayılan arama sorgusu
  filters: {
    genre: '',
    language: '',
    rating: 0,
  },
  watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
  currentPage: 1,
  pageSize: 6, // Sayfa başına 6 dizi
};

export function showReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, shows: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload, currentPage: 1 };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, currentPage: 1 };
    case 'SET_WATCHLIST':
      return { ...state, watchlist: action.payload };
    case 'ADD_WATCHLIST':
      // Zaten listede varsa ekleme
      if (state.watchlist.find(show => show.id === action.payload.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_WATCHLIST':
      return { ...state, watchlist: state.watchlist.filter(show => show.id !== action.payload) };
    case 'CLEAR_WATCHLIST':
      return { ...state, watchlist: [] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
