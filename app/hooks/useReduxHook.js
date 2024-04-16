import { useDispatch, useSelector } from 'react-redux';

//custom useSelector hook we can use in our application anywhere
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();
