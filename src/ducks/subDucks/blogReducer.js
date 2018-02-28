import axios from 'axios'

const initialState = {
  blogData: [],
  length: 0,
  title: '',
  body: '',
  newTitle: '',
  newBody: '',
  id: 0,
  index: 0,
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
  GET = 'GET',
  SET = 'SET'

export const changeBody = value => ({
  type: CHANGE,
  data: 'body',
  payload: value,
})

export const changeNewBody = value => ({
  type: CHANGE,
  data: 'newBody',
  payload: value,
})

export const changeTitle = (e) => {
  const { value, name } = e.target
  return {
    type: CHANGE,
    data: name,
    payload: value,
  }
}

export const changeIndex = (index, inc) => {
  const x = index + inc
  return {
    type: CHANGE,
    data: 'index',
    payload: x,
  }
}

export const getBlogs = () => async (dispatch) => {
  let blogData = await axios.get('/api/blogs')
  return dispatch({
    type: GET,
    data: 'blogData',
    payload: blogData.data,
  })
}

export const setBlog = (blogData, index) => ({
  type: SET,
  payload: {
    body: blogData[index].body,
    title: blogData[index].title,
    id: blogData[index].id,
  },
})

export const postBlog = (title, body, cb) => async (dispatch) => {
  let today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear()
  dd < 10 && (dd = `0${dd}`)
  mm < 10 && (mm = `0${mm}`)
  today = `${yyyy}-${mm}-${dd}`
  await axios.post('/api/postblog', {
    title,
    body,
    date: today,
  }).catch((error) => {
    console.log(error)
  })
  cb()
  return dispatch({
    type: RESET,
  })
}

export const updateBlog = (newTitle, newBody, id, cb) => {
  axios.put('/api/updateblog', {
    body: newBody,
    title: newTitle,
    id,
  }).catch((error) => {
    console.log(error)
  })
  cb()
  return {
    type: RESET,
  }
}

export const deleteBlog = (id, cb) => {
  axios.delete(`/api/deleteblog/${id}`)
    .catch((error) => {
      console.log(error)
    })
  cb()
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
    case SET:
      return {
        ...state,
        newBody: payload.body,
        newTitle: payload.title,
        id: payload.id,
      }
    case RESET:
      return {
        ...state,
        body: '',
        newBody: '',
        title: '',
        newTitle: '',
      }
    default:
      return state
  }
}