import axios from "axios";

export const getAll = async (req, limit) => {
  let response = {
    items: [],
    isEmpty: false,
  };

  const res = await axios.get(req);
  const ids = res.data.items;
  if (ids.length > limit) {
    ids.length = limit;
  }
  let reqArr = await ids.map((id) =>
    axios.get(
      `https://developers.ria.com/dom/info/${id}?api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
    )
  );
  let responses = await axios.all(reqArr);
  response.items = responses.map((res) => res.data);
  if (response.items[0] === undefined) {
    response.isEmpty = true;
  } else {
    response.isEmpty = false;
  }

  return response;
};

export const getOne = async (req, imgError) => {
  const localStorage = window.localStorage;

  const res = await axios.get(req);
  const photoUrl = res.data.beautiful_url.substring(
    0,
    res.data.beautiful_url.lastIndexOf("-")
  );
  let posterPhotos = ["../no-image.png"];
  if (res.data.photos !== undefined && !imgError) {
    console.log("get real photos");
    posterPhotos = Object.keys(res.data.photos).map(
      (id) =>
        `https://cdn.riastatic.com/photosnew/dom/photo/${photoUrl}__${id}fl.jpg`
    );
  }
  let ids = [];
  if (localStorage.getItem("wishList") !== null) {
    const list = JSON.parse(localStorage.getItem("wishList"));
    ids = list.map((item) => item._id);
  }
  const response = {
    poster: res.data,
    photos: posterPhotos,
    checked: ids.includes(res.data._id),
  };

  return response;
};

export const getCharactArr = async (req) => {
  const res = await axios.get(req);

  return res.data;
};

export default { getAll, getOne, getCharactArr };
