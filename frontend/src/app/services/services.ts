// @ts-ignore
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {IMobileService, IServices } from "./types.ts";

// @ts-nocheck
export const servicesApi = createApi({
    reducerPath: 'servicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api', // Указываем прокси-адрес вместо прямого обращения
        // @ts-ignore
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
    tagTypes: ['Services', 'ServiceInfo'],
    // @ts-ignore
    endpoints: (builder) => ({
        // @ts-ignore
        getServices: builder.query<IServices, {
            oneTimeService?: boolean;
            type: 'MINUTES' | 'GIGABYTES' | 'SMS';
            name?: string;
        }
        >({
            // @ts-ignore
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
        // @ts-ignore
        getServiceInfo: builder.query<IMobileService, number>({
            // @ts-ignore
            query: (id) => `service/${id}`,
            // @ts-ignore
            providesTags: (result, error, id) => [{ type: 'ServiceInfo', id }],
        }),
        // @ts-ignore
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
                        // @ts-ignore
                        id,// @ts-ignore
                        oneTimeService,// @ts-ignore
                        status,// @ts-ignore
                        type,// @ts-ignore
                        name,// @ts-ignore
                        description,// @ts-ignore
                        cost,// @ts-ignore
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
            // @ts-ignore
            invalidatesTags: (result, error, { id }) => [
                { type: 'Services' },
                { type: 'ServiceInfo', id },
            ],
        }),// @ts-ignore
        createService: builder.mutation<void, {
            oneTimeService: boolean;
            status: "ACTIVE",
            type: "GIGABYTES" | "MINUTES" | "SMS",
            name: string;
            description: string;
            cost: number;
            countResources: number;
        }>({
            query: ({// @ts-ignore
                        oneTimeService,// @ts-ignore
                        status,// @ts-ignore
                        type,// @ts-ignore
                        name,// @ts-ignore
                        description,// @ts-ignore
                        cost,// @ts-ignore
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
            // @ts-ignore
            invalidatesTags: (result, error, ) => [
                { type: 'Services' },
            ],
        }),// @ts-ignore
        deleteService: builder.mutation<void, {
            id: number;
        }>({
            query: ({// @ts-ignore
                        id
                    }) => ({
                url: `service/${id}`,
                method: 'DELETE',
            }),
            // @ts-ignore
            invalidatesTags: (result, error, ) => [
                { type: 'Services' },
            ],
        }),
    }),
});

export const { useGetServicesQuery, useGetServiceInfoQuery,
    useUpdateServiceMutation, useCreateServiceMutation, useDeleteServiceMutation } = servicesApi;