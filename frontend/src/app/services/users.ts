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
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
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
      }>({
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
      providesTags: ['Users'],
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
      },
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
      },
      forceRefetch({ currentArg, previousArg }) {
        // Если хотя бы один из фильтров изменился, необходимо выполнить запрос заново
        return currentArg !== previousArg;
      },
    }),
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
    >({
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
    }),
    getServices: builder.query<IMobileService[], string>({
      query: () => ({
        url: 'service',
        method: 'GET'
      })
    }),
    getTariffs: builder.query<ITariff[], string>({
      query: () => ({
        url: 'tariff',
        method: 'GET'
      })
    }),
    getUserInfo: builder.query<IUserInfo, number>({
      query: (id) => `phoneNumber/user/${id}` 
    }),
    getBalanceInfo: builder.query<IBalanceOperation, number>({
      query: (id) => `phoneNumber/balance/${id}`,
      providesTags: ['Users'],
    }),
    getTariffInfo: builder.query<IUserTariffInfo, number>({
      query: (id) => `phoneNumber/tariff/${id}`,
      providesTags: ['Users'],
    }),
    getServicesInfo: builder.query<IUserServicesInfo, number>({
      query: (id) => `phoneNumber/service/${id}`,
      providesTags: ['Users'],
    }),
    fetchTariffs: builder.mutation<ITariffs, {status: string; name?: string}>({
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
    }),
    fetchServices: builder.mutation<IServices, {name?: string}>({
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
    }),
    activateService: builder.mutation<IActivateService, {phoneNumberId: number; serviceId: number}>({
      query: ({ phoneNumberId, serviceId }) => ({
        url: 'phoneNumber/service',
        method: 'POST',
        params: {
          phoneNumberId,
          serviceId
        }
      }),
      invalidatesTags: ['Users'],
    }),
    deactivateService: builder.mutation<string, {phoneNumberId: number; serviceId: number}>({
      query: ({ phoneNumberId, serviceId }) => ({
        url: 'phoneNumber/service',
        method: 'DELETE',
        params: {
          phoneNumberId,
          serviceId
        }
      }),
      invalidatesTags: ['Users'],
    }),
    changeTariff: builder.mutation<IChangeTariff, {phoneNumberId: number; tariffId: number}>({
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