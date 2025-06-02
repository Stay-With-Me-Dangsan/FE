import { useMutation, useQueryClient } from '@tanstack/react-query';
import HouseApi from '../../../api-url/house/house.api';
import {
  ICreateHouseDetail,
  ICreateHouseMain,
  IDeleteHouseDetail,
  IHouseDetails,
  IPatchUpdateHouseDetail,
  IHouseFilterCondition,
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
  const getHouseByConditionMutation = useMutation({
    mutationFn: (data: IHouseFilterCondition) => HouseApi.getHouseDetailsByCondition(data),
  });

  const getHouseMainMutation = useMutation({
    mutationFn: () => HouseApi.getMainClusteredHouses(),
  });

  const getClustersMutation = useMutation({
    mutationFn: (data: IHouseDetails) => HouseApi.getClusteredHouses(data),
  });

  const postLikeMutation = useMutation({
    mutationFn: (houseDetailId: number) => HouseApi.postLikeMutation(houseDetailId),
  });

  const deleteLikeMutation = useMutation({
    mutationFn: (houseDetailId: number) => HouseApi.deleteLikeMutation(houseDetailId),
  });

  return {
    createHouseMainMutation,
    createHouseDetailMutation,
    updateHouseDetailMutation,
    deleteHouseDetailMutation,
    getHouseMainMutation,
    getClustersMutation,
    getHouseByConditionMutation,
    postLikeMutation,
    deleteLikeMutation,
  };
};
