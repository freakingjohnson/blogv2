import axios from 'axios'

const initialState = {
  name: '',
  image: [],
  cols: 1,
  response: {},
  secure_url: '',
  public_id: '',
}

const CHANGE = 'CHANGE',
  RESET = 'RESET',
  DROP = 'DROP',
  CHANGE_STATE = 'CHANGE_STATE'

// export const upload = (img) => {
//   img.map((image) => {
//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append('tags', 'blogpictures');
//     formData.append('upload_preset', 'efvqy0li')
//     formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
//     formData.append('timestamp', (Date.now() / 1000) | 0)
//     return axios.post('https://api.cloudinary.com/v1_1/freakingjohnson/image/upload', formData, {
//       headers: { 'X-Requested-With': 'XMLHttpRequest' },
//     }).then(res => getUrl(res))
//     // const { secure_url, public_id } = response.data
//   })
// }


// export const getUrl = image => ({
//   type: GET_URL,
//   payload: image,
// });

// axios.post('/api/postimg', {
//   image: secure_url,
//   title: state.name,
//   public_id,
//   cols: state.cols,
// }).then((res) => {
//   console.log(res)
// }).catch((error) => {
//   console.log(error)
// })
// console.log(response.data);
// return {
//   type: RESET,
// }

export const drop = image => ({
  type: DROP,
  payload: image,
})

export const change = (e) => {
  const { value, name } = e.target
  return {
    type: CHANGE,
    data: name,
    payload: value,
  }
}

export const changeState = res => ({
  type: CHANGE_STATE,
  payload: res,
})

export const reset = () => ({
  type: RESET,
})


export default function imgReducer(state = initialState, action) {
  const { payload, type, data } = action
  switch (type) {
    case CHANGE:
      return { ...state, [data]: payload }
    case DROP:
      return { ...state, image: payload }
    case CHANGE_STATE:
      return {
        ...state, response: payload, secure_url: payload.secure_url, public_id: payload.public_id,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}