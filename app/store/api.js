import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UrlBase } from '../utils/common/urlbase';

export const API = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: UrlBase.SERVER,
    prepareHeaders: (headers, { getState }) => {
      console.log(JSON.stringify(getState(), 'igdqduhie diueqhde'))
      const token = getState().operation?.authentication?.access_token
      console.log(JSON.stringify(token) + ' What is the token here....');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    get: builder.query({
      query: param => {
        console.log('Login get api - URL:', param);
        return param;
      },
    }),
    post: builder.mutation({
      query: ({ data, url }) => {
        console.log('Login Mutation - URL:', url);
        console.log('Login Mutation - Data:', data);
        return {
          url: url,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { usePostMutation, useGetQuery } = API;
