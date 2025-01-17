import axios from 'axios';
import { Resource, Species, Film, } from '../types';
import { useQuery } from '@tanstack/react-query';

const fetchResource = async (resourceType: string, id: string): Promise<Resource> => {
  const delay = 1000; 
  await new Promise(resolve => setTimeout(resolve, delay));
  const { data } = await axios.get(`https://swapi.dev/api/${resourceType}/${id}/`);
  return data;
};

const fetchAdditionalInfo = async (url: string): Promise<any> => {
  if (!url) return null;
  const { data } = await axios.get(url);
  return data;
};

export const useResource = (resourceType: string, id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [resourceType, id], 
    queryFn: () => fetchResource(resourceType, id),
    enabled: !!id, 
  });

  const homeworldQuery = useQuery({
    queryKey: ['homeworld', data?.homeworld], 
    queryFn: () => data?.homeworld ? fetchAdditionalInfo(data.homeworld) : Promise.resolve(null),
    enabled: !!data?.homeworld,
  });

  const speciesQuery = useQuery({
    queryKey: ['species', data?.species], 
    queryFn: () => data?.species ? Promise.all(data.species.map((url) => fetchAdditionalInfo(url) as Promise<Species>)) : Promise.resolve([]),
    enabled: !!data?.species,
  });

  const filmsQuery = useQuery({
    queryKey: ['films', data?.films],
    queryFn: () => data?.films ? Promise.all(data.films.map((url) => fetchAdditionalInfo(url) as Promise<Film>)) : Promise.resolve([]),
    enabled: !!data?.films,
  });

  const starshipsQuery = useQuery({
    queryKey: ['starships', data?.starships], 
    queryFn: () => data?.starships ? Promise.all(data.starships.map((url) => fetchAdditionalInfo(url))) : Promise.resolve([]),
    enabled: !!data?.starships,
  });

  return {
    resource: data,
    homeworld: homeworldQuery.data,
    species: speciesQuery.data,
    films: filmsQuery.data,
    starships: starshipsQuery.data,
    isLoading: isLoading || homeworldQuery.isLoading || speciesQuery.isLoading || filmsQuery.isLoading || starshipsQuery.isLoading,
    error: error || homeworldQuery.error || speciesQuery.error || filmsQuery.error || starshipsQuery.error,
  };
};
