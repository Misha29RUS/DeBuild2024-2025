import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {IMobileService, IServices } from "./types.ts";


export const servicesApi = createApi({
    reducerPath: 'servicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api', // Указываем прокси-адрес вместо прямого обращения
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Services', 'ServiceInfo'],
    endpoints: (builder) => ({
        getServices: builder.query<IServices, {
            oneTimeService?: boolean;
            type: 'MINUTES' | 'GIGABYTES' | 'SMS';
            name?: string;
        }
        >({
            query: ({ oneTimeService, name, type }) => {
                const body: Record<string, any> = { type };
                if (oneTimeService !== undefined) {
                    body.oneTimeService = oneTimeService;
                }
                if (name?.trim()) {
                    body.name = name;
                }
                return {
                    url: '/services',
                    method: 'POST',
                    body,
                    params: {
                        page: 0,
                        size: 100
                    },
                };
            },
            providesTags: ['Services'],
        }),
        getServiceInfo: builder.query<IMobileService, number>({
            query: (id) => `service/${id}`,
            providesTags: (result, error, id) => [{ type: 'ServiceInfo', id }],
        }),
        updateService: builder.mutation<void, {
            id: number;
            oneTimeService: boolean;
            status: "ACTIVE",
            type: "GIGABYTES" | "MINUTES" | "SMS",
            name: string;
            description: string;
            cost: number;
            countResources: number;
        }>({
            query: ({
                        id,
                        oneTimeService,
                        status,
                        type,
                        name,
                        description,
                        cost,
                        countResources
            }) => ({
                url: `service/${id}`,
                method: 'PUT',
                body: {
                    oneTimeService,
                    status,
                    type,
                    name,
                    description,
                    cost,
                    countResources
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Services' },
                { type: 'ServiceInfo', id },
            ],
        }),
        createService: builder.mutation<void, {
            oneTimeService: boolean;
            status: "ACTIVE",
            type: "GIGABYTES" | "MINUTES" | "SMS",
            name: string;
            description: string;
            cost: number;
            countResources: number;
        }>({
            query: ({
                        oneTimeService,
                        status,
                        type,
                        name,
                        description,
                        cost,
                        countResources
                    }) => ({
                url: `service`,
                method: 'POST',
                body: {
                    oneTimeService,
                    status,
                    type,
                    name,
                    description,
                    cost,
                    countResources
                },
            }),
            invalidatesTags: (result, error, ) => [
                { type: 'Services' },
            ],
        }),
        deleteService: builder.mutation<void, {
            id: number;
        }>({
            query: ({
                        id
                    }) => ({
                url: `service/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, ) => [
                { type: 'Services' },
            ],
        }),
    }),
});

export const { useGetServicesQuery, useGetServiceInfoQuery,
    useUpdateServiceMutation, useCreateServiceMutation, useDeleteServiceMutation } = servicesApi;