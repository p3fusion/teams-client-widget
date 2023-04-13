import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoaded: false,
  tenantID: '',
  data: {},
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {

    updateClient: (state, action) => {
      return {
        ...state,
        isLoaded: true,
        data: action.payload
      }
    },

  },
})
// Action creators are generated for each case reducer function
export const { updateClient, updateClientConfig, updateWhiteListedUsers } = clientSlice.actions

export default clientSlice.reducer