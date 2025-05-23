import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';
import {
  ICreateHouseDetail,
  ICreateHouseMain,
  IDeleteHouseDetail,
  IHouseDetails,
  IPatchUpdateHouseDetail,
} from '../../../types/dto/house';

export const useHouseMutation = () => {
  const queryClient = useQueryClient();

  const createHouseMainMutation = useMutation({
    mutationFn: (data: ICreateHouseMain) => HouseApi.postCreateHouseMain(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['house-main'] });
    },
  });

  const createHouseDetailMutation = useMutation({
    mutationFn: (data: ICreateHouseDetail) => HouseApi.postCreateHouseDetail(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['house-detail'] });
    },
  });

  const updateHouseDetailMutation = useMutation({
    mutationFn: (data: IPatchUpdateHouseDetail) => HouseApi.patchUpdateHouseDetail(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['house-detail'] });
    },
  });

  const deleteHouseDetailMutation = useMutation({
    mutationFn: (data: IDeleteHouseDetail) => HouseApi.deleteHouseDetail(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['house-detail'] });
    },
  });

  const getHouseMainMutation = useMutation({
    mutationFn: () => HouseApi.getMainClusteredHouses(),
  });

  const getClustersMutation = useMutation({
    mutationFn: (data: IHouseDetails) => HouseApi.getClusteredHouses(data),
  });

  return {
    createHouseMainMutation,
    createHouseDetailMutation,
    updateHouseDetailMutation,
    deleteHouseDetailMutation,
    getHouseMainMutation,
    getClustersMutation,
  };
};
