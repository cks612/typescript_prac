import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchCustomer = () => {
  return request({ url: "/member" });
};

const AddCustomerData = (userData: {}) => {
  return request({ url: "/member", method: "post", data: userData });
};

const DeleteCustomerData = (id: number) => {
  return request({ url: `/member/${id}`, method: "delete" });
};

export const useGetCustomer = (onSuccess: any, onError: any) => {
  return useQuery("new-customer", fetchCustomer, {
    onSuccess,
    onError,
  });
};

export const useAddCustomerData = () => {
  const queryClient = useQueryClient();
  return useMutation(AddCustomerData, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("new-customer");
      const previousHeroData = queryClient.getQueryData("new-customer");
      queryClient.setQueryData("new-customer", (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _customer, context: any) => {
      queryClient.setQueryData("new-customer", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("new-customer");
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteCustomerData, {
    onMutate: async () => {
      await queryClient.cancelQueries("delete");
      const previousHeroData = queryClient.getQueryData("delete");
      queryClient.setQueryData("delete", (oldQueryData: any) => {
        return {
          ...oldQueryData,
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _customer, context: any) => {
      queryClient.setQueryData("delete", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("delete");
    },
  });
};
