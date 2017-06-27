import { browserHistory } from 'react-router';
import cookieDough from 'cookie-dough';
import types from '../constants/ActionTypes';
import { requestOauth } from '../utils/fetch';
import { query } from '../utils/url';

const qs = query(window.location.search.substr(1).split('&'));
const cookie = cookieDough();

export const checkToken = () => (dispatch) => {
  const token = cookie.get('token');
  if (!token) {
    return browserHistory.push('/login');
  }
  return requestOauth('/cookies', 'POST', { token })
  .then(data => {
    if (!/locale\=/.test(window.location.search)) {
      let language;

      if (localStorage.getItem('locale')) {
        language = localStorage.getItem('locale');
      } else {
        localStorage.setItem('locale', navigator.language);
        language = navigator.language;
        if (/^en/.test(language)) language = 'en';
      }

      if (!/^(en|zh-tw|zh-cn)$/.test(language.toLowerCase())) language = 'en';

      if (!/\?/.test(window.location.href)) {
        window.location.href = window.location.href + '?locale=' + language;
      } else {
        window.location.href = window.location.href + '&locale=' + language;
      }
    } else {
      localStorage.setItem('locale', qs['locale']);
    }

    return dispatch({
      type: types.CHECKTOKEN,
      access_token: data.results.access_token,
      token: data.results.token,
      userId: data.results.userId,
      userName: data.results.userName,
      email: data.results.email,
      userImage: data.results.userImage,
      isAdmin: data.results.isAdmin,
    })
  })
  .catch(error => browserHistory.push(`/login?errorMsg=${error}`));
};

export const signOut = () => (dispatch) => {
  cookie.remove('token');
  return dispatch({ type: types.SIGNOUT });
};
