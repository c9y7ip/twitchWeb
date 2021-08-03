import axios from "axios";

const twitch = axios.create({
  headers: {
    Authorization: process.env.REACT_APP_TOKEN,
    "Client-Id": process.env.REACT_APP_CLIENTID,
  },
});

const getStream = (searchInput) =>
  twitch.get("https://api.twitch.tv/helix/search/channels", {
    params: { query: searchInput, live_only: true },
  });

const getStreamInfo = (id) =>
  twitch.get("https://api.twitch.tv/helix/channels", {
    params: { broadcaster_id: id },
  });

const api = {
  getStream,
  getStreamInfo,
};

export default api;
