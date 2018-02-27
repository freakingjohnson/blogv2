import axios from 'axios'

const initialState = {
  blogData: [],
  length: 0,
  title: '',
  body: '',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image'],
      ['clean'],
    ],
  },
  formats: [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ],
}

const CHANGE = 'CHANGE',
  RESET = 'RESET',
  GET = 'GET'

export const changeBody = value => ({
  type: CHANGE,
  data: 'body',
  payload: value,
})

export const changeTitle = e => ({
  type: CHANGE,
  data: 'title',
  payload: e.target.value,
})

export const getBlogs = () => async (dispatch) => {
  let blogData = await axios.get('/api/blogs')
  return dispatch({
    type: GET,
    data: 'blogData',
    payload: blogData.data,
  })
}

export const postBlog = (title, body) => {
  let today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear()
  dd < 10 && (dd = `0${dd}`)
  mm < 10 && (mm = `0${mm}`)
  today = `${yyyy}-${mm}-${dd}`
  axios.post('/api/postblog', {
    title,
    body,
    date: today,
  }).catch((error) => {
    console.log(error)
  })
  return {
    type: RESET,
  }
}

export default function blogReducer(state = initialState, action) {
  const { payload, type, data } = action
  switch (type) {
    case CHANGE:
      return { ...state, [data]: payload }
    case GET:
      return { ...state, [data]: payload, length: payload.length }
    case RESET:
      return initialState
    default:
      return state
  }
}