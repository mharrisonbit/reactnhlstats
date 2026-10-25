const isDev = process.env.NODE_ENV === 'development';

// In development, requests go through the CRA dev proxy (src/setupProxy.js) to avoid CORS.
export const basicUrl = isDev ? '/proxy/basic/' : 'https://api.nhle.com/';
export const statsUrl = isDev ? '/proxy/stats/' : 'https://api-web.nhle.com/';
export const scoresUrl = isDev ? '/proxy/scores/' : 'https://nhl-score-api.herokuapp.com/';
