import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import store from '../redux/index.tsx';

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
