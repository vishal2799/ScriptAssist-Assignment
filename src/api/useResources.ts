import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchResources = async (page: number) => {
  const delay = 1000; 
  await new Promise(resolve => setTimeout(resolve, delay));
  const { data } = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
  return { results: data.results, count: data.count }; 
};

export const useResources = (page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', page], 
    queryFn: () => fetchResources(page), 
    // placeholderData: () => ({ results: [], count: 0 }),
    // staleTime: 5000,
  });

  const totalPages = data ? Math.ceil(data.count / 10) : 0; 

  return {
    resourceList: data?.results,
    totalPages, 
    isLoading,
    error,
  };
};
