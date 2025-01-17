import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Usar tipos específicos para dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Usar tipos específicos para selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
