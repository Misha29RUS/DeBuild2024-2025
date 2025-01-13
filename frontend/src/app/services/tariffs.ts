// @ts-ignore
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {ITariff, ITariffs} from "./types.ts";


export const tariffsApi = createApi({
    reducerPath: 'tariffsApi',
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
    tagTypes: ['Tariffs', 'TariffInfo'],
    // @ts-ignore
    endpoints: (builder) => ({
        // @ts-ignore
        getTariffs: builder.query<ITariffs, {
            status: 'ACTIVE' | 'HIDDEN';
            name?: string;
            type?: 'FIXED' | 'CUSTOMIZABLE';
        }
        >({
            // @ts-ignore
            query: ({ status, name, type }) => {
                const body: Record<string, any> = { status };
                if (name?.trim()) {
                    body.name = name;
                }
                if (type?.trim()) {
                    body.type = type;
                }
                return {
                    url: '/tariffs',
                    method: 'POST',
                    body,
                    params: {
                        page: 0,
                        size: 100
                    },
                };
            },
            providesTags: ['Tariffs'],
        }),
        // @ts-ignore
        getTariffInfo: builder.query<ITariff, number>({
            // @ts-ignore
            query: (id) => `tariff/${id}`,
            // @ts-ignore
            providesTags: (result, error, id) => [{ type: 'TariffInfo', id }],
        }),
        // @ts-ignore
        updateTariff: builder.mutation<void, {
            id: number;
            type: "FIXED" | "CUSTOMIZABLE";
            status: "ACTIVE" | "HIDDEN";
            name: string;
            description: string;
            cost: number;
            tariffResourceDto: {
                id: number;
                countMinutes: number | null;
                costOneMinute: number;
                stepsMinutes: number[] | null;
                countSms: number | null;
                costOneSms: number;
                stepsSms: number[] | null;
                countGigabytes: number | null;
                costOneGigabyte: number;
                stepsGigabytes: number[] | null;
            }
        }>({
            // @ts-ignore
            query: (tariffData) => ({
                url: `tariff/${tariffData.id}`,
                method: 'PUT',
                body: tariffData,
            }),
            // @ts-ignore
            invalidatesTags: (result, error, { id }) => [
                { type: 'Tariffs' },
                { type: 'TariffInfo', id },
            ],
        }),
        // @ts-ignore
        createTariff: builder.mutation<void, {
            type: "FIXED" | "CUSTOMIZABLE";
            status: "ACTIVE" | "HIDDEN";
            name: string;
            description: string;
            cost: number;
            tariffResourceDto: {
                countMinutes: number | null;
                costOneMinute: number;
                stepsMinutes: number[] | null;
                countSms: number | null;
                costOneSms: number;
                stepsSms: number[] | null;
                countGigabytes: number | null;
                costOneGigabyte: number;
                stepsGigabytes: number[] | null;
            }
        }>({
            // @ts-ignore
            query: (tariffData) => ({
                url: `tariff`,
                method: 'POST',
                body: tariffData,
            }),
            // @ts-ignore
            invalidatesTags: (result, error, ) => [
                { type: 'Tariffs' },
            ],
        }),
        // @ts-ignore
        deleteTariff: builder.mutation<void, {
            id: number;
        }>({
            query: ({
                        // @ts-ignore
                        id
                    }) => ({
                url: `tariff/${id}`,
                method: 'DELETE',
            }),
            // @ts-ignore
            invalidatesTags: (result, error, ) => [
                { type: 'Tariffs' },
            ],
        }),
    }),
});

export const { useGetTariffsQuery, useGetTariffInfoQuery,
    useUpdateTariffMutation, useCreateTariffMutation, useDeleteTariffMutation } = tariffsApi;