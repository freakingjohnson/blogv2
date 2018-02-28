import axios from 'axios'

const initialState = {
  name: '',
  imageIndex: 0,
  image: [],
  imageData: [],
  cols: 0,
  rows: 0,
}

const CHANGE = 'CHANGE',
  RESET_IMG = 'RESET_IMG'

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

export const changeImageIndex = (index, inc) => {
  const x = index + inc
  return {
    type: CHANGE,
    data: 'imageIndex',
    payload: x,
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
    type: RESET_IMG,
  }
}

export const reset = () => ({
  type: RESET_IMG,
})

export default function imgReducer(state = initialState, action) {
  const {
    payload, type, data,
  } = action
  switch (type) {
    case CHANGE:
      return { ...state, [data]: payload }
    case RESET_IMG:
      return {
        ...state, cols: 0, rows: 0, name: '', image: [],
      }
    default:
      return state
  }
}