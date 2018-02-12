import axios from 'axios'

const initialState = {
  name: '',
  image: [],
  imageData: [],
  cols: 0,
  rows: 0,
}

const CHANGE = 'CHANGE',
  RESET = 'RESET'

export const drop = image => ({
  type: CHANGE,
  data: 'image',
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

export const getImg = () => async (dispatch) => {
  let imageData = await axios.get('/api/getimg')
  return dispatch({
    type: CHANGE,
    data: 'imageData',
    payload: imageData.data,
  })
}

export const post = (title, cols, rows, image, public_id) => {
  axios.post('/api/postimg', {
    image,
    title,
    public_id,
    cols,
    rows,
  }).then(() => {
  }).catch((err) => {
    console.log(err)
  })
  return {
    type: RESET,
  }
}

export const reset = () => ({
  type: RESET,
})

export default function imgReducer(state = initialState, action) {
  const {
    payload, type, data,
  } = action
  switch (type) {
    case CHANGE:
      return { ...state, [data]: payload }
    case RESET:
      return {
        ...state, cols: 0, rows: 0, name: '', image: [],
      }
    default:
      return state
  }
}