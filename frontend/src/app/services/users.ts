// @ts-ignore
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  ICountUsersInterface, 
  IUsers,  
  IMobileService,
  ITariff,
  IUserInfo,
  IBalanceOperation,
  IUserTariffInfo,
  IUserServicesInfo,
  ITariffs,
  IServices,
  IActivateService,
  IChangeTariff
} from './types';

export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Указываем прокси-адрес вместо прямого обращения
    // @ts-ignore
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Users'],// @ts-ignore
  endpoints: (builder) => ({// @ts-ignore
    getUsers: builder.query<
      IUsers,
      {
        name?: string;
        phoneNumber?: string;
        surname?: string;
        patronymic?: string;
        tariffsIds?: number[];
        mobileServicesIds?: number[];
        page: number;
        size: number;
      }>({// @ts-ignore
      query: ({ name, phoneNumber, surname, patronymic, tariffsIds, mobileServicesIds, page, size }) => ({
        url: 'abonents', // Эндпоинт относительно baseUrl
        method: 'POST',
        body: {
          name,
          phoneNumber,
          surname,
          patronymic,
          tariffsIds,
          mobileServicesIds,
        },
        params: { page, size }, // Query-параметры
      }),
      providesTags: ['Users'],// @ts-ignore
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, size, ...filters } = queryArgs;
    
        const filtersKey = Object.entries(filters)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
          .join(',');
    
        const key = `${endpointName}-${filtersKey || 'no-filters'}`;
    
        return key;
      },// @ts-ignore
      merge: (currentCache, newItems, { arg: { page } }) => {
        if (page === 0) {
          return {
            ...newItems, // Заменяем весь кэш новыми данными
            content: [...newItems.content], // Обновляем content
            last: newItems.last, // Обновляем last
          };
        }
      
        // Обновляем только content и last
        currentCache.content.push(...newItems.content);
        currentCache.last = newItems.last;
      
        return currentCache;
      },// @ts-ignore
      forceRefetch({ currentArg, previousArg }) {
        // Если хотя бы один из фильтров изменился, необходимо выполнить запрос заново
        return currentArg !== previousArg;
      },
    }),// @ts-ignore
    getCountUsers: builder.query<
      ICountUsersInterface,
      {
        name?: string;
        phoneNumber?: string;
        surname?: string;
        patronymic?: string;
        tariffsIds?: number[];
        mobileServicesIds?: number[];
      }
    >({// @ts-ignore
      query: ({ name, phoneNumber, surname, patronymic, tariffsIds, mobileServicesIds }) => ({
        url: 'abonents/count',
        method: 'POST',
        body: {
          name,
          phoneNumber,
          surname,
          patronymic,
          tariffsIds,
          mobileServicesIds,
        },
      })
    }),// @ts-ignore
    getServices: builder.query<IMobileService[], string>({
      query: () => ({
        url: 'service',
        method: 'GET'
      })
    }),// @ts-ignore
    getTariffs: builder.query<ITariff[], string>({
      query: () => ({
        url: 'tariff',
        method: 'GET'
      })
    }),// @ts-ignore
    getUserInfo: builder.query<IUserInfo, number>({// @ts-ignore
      query: (id) => `phoneNumber/user/${id}` 
    }),// @ts-ignore
    getBalanceInfo: builder.query<IBalanceOperation, number>({// @ts-ignore
      query: (id) => `phoneNumber/balance/${id}`,
      providesTags: ['Users'],
    }),// @ts-ignore
    getTariffInfo: builder.query<IUserTariffInfo, number>({// @ts-ignore
      query: (id) => `phoneNumber/tariff/${id}`,
      providesTags: ['Users'],
    }),// @ts-ignore
    getServicesInfo: builder.query<IUserServicesInfo, number>({// @ts-ignore
      query: (id) => `phoneNumber/service/${id}`,
      providesTags: ['Users'],
    }),// @ts-ignore
    fetchTariffs: builder.mutation<ITariffs, {status: string; name?: string}>({// @ts-ignore
      query: ({ name }) => ({
        url: 'tariffs',
        method: 'POST',
        params: {
          page: 0,
          size: 5
        },
        body: {
          status: 'ACTIVE',
          ...(name ? { name } : {})
        }
      })
    }),// @ts-ignore
    fetchServices: builder.mutation<IServices, {name?: string}>({// @ts-ignore
      query: ({ name }) => ({
        url: 'services',
        method: 'POST',
        params: {
          page: 0,
          size: 10
        },
        body: {
          ...(name ? { name } : {})
        }
      })
    }),// @ts-ignore
    activateService: builder.mutation<IActivateService, {phoneNumberId: number; serviceId: number}>({// @ts-ignore
      query: ({ phoneNumberId, serviceId }) => ({
        url: 'phoneNumber/service',
        method: 'POST',
        params: {
          phoneNumberId,
          serviceId
        }
      }),
      invalidatesTags: ['Users'],
    }),// @ts-ignore
    deactivateService: builder.mutation<string, {phoneNumberId: number; serviceId: number}>({// @ts-ignore
      query: ({ phoneNumberId, serviceId }) => ({
        url: 'phoneNumber/service',
        method: 'DELETE',
        params: {
          phoneNumberId,
          serviceId
        }
      }),
      invalidatesTags: ['Users'],
    }),// @ts-ignore
    changeTariff: builder.mutation<IChangeTariff, {phoneNumberId: number; tariffId: number}>({// @ts-ignore
      query: ({ phoneNumberId, tariffId }) => ({
        url: 'phoneNumber/tariff',
        method: 'POST',
        params: {
          phoneNumberId,
          tariffId
        }
      }),
      invalidatesTags: ['Users'],
    })
  }),
});

export const { 
  useGetUsersQuery, useGetCountUsersQuery,
  useGetServicesQuery, useGetTariffsQuery,
  useGetUserInfoQuery, useGetBalanceInfoQuery,
  useGetTariffInfoQuery, useGetServicesInfoQuery,
  useFetchTariffsMutation, useFetchServicesMutation,
  useActivateServiceMutation, useDeactivateServiceMutation,
  useChangeTariffMutation 
} = usersApi;