import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {ITariff, ITariffs} from "./types.ts";


export const tariffsApi = createApi({
    reducerPath: 'tariffsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api', // Указываем прокси-адрес вместо прямого обращения
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Tariffs', 'TariffInfo'],
    endpoints: (builder) => ({
        getTariffs: builder.query<ITariffs, {
            status: 'ACTIVE' | 'HIDDEN';
            name?: string;
            type?: 'FIXED' | 'CUSTOMIZABLE';
        }
        >({
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
        getTariffInfo: builder.query<ITariff, number>({
            query: (id) => `tariff/${id}`,
            providesTags: (result, error, id) => [{ type: 'TariffInfo', id }],
        }),
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
            query: (tariffData) => ({
                url: `tariff/${tariffData.id}`,
                method: 'PUT',
                body: tariffData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Tariffs' },
                { type: 'TariffInfo', id },
            ],
        }),
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
            query: (tariffData) => ({
                url: `tariff`,
                method: 'POST',
                body: tariffData,
            }),
            invalidatesTags: (result, error, ) => [
                { type: 'Tariffs' },
            ],
        }),
        deleteTariff: builder.mutation<void, {
            id: number;
        }>({
            query: ({
                        id
                    }) => ({
                url: `tariff/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, ) => [
                { type: 'Tariffs' },
            ],
        }),
    }),
});

export const { useGetTariffsQuery, useGetTariffInfoQuery,
    useUpdateTariffMutation, useCreateTariffMutation, useDeleteTariffMutation } = tariffsApi;