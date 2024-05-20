import { useNavigate } from 'react-router-dom';

export const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };


export const useNav = () => {
  const navigate = useNavigate();
  return (src:string) => navigate(src);
};