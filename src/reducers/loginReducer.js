import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    }
  }
});

const { setUser, clearUser } = loginSlice.actions;

export const initializeLogin = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password });

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    blogService.setToken(user.token);
    
    dispatch(setUser(user));

    return user;
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);
    dispatch(clearUser());
  };
};

export default loginSlice.reducer;