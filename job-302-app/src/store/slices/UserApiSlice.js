import { ENDPOINTS } from "../../utils/static";
import { apiSlice } from "./ApiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.LOGIN,
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.REGISTER,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.PROFILE,
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: ENDPOINTS.LOGOUT,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
