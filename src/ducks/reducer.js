import axios from 'axios'

const initialState = {
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

const CHANGE_BODY = 'CHANGE_BODY',
  CHANGE_TITLE = 'CHANGE_TITLE',
  RESET = 'RESET'

export const changeBody = value => ({
  type: CHANGE_BODY,
  payload: value,
})

export const changeTitle = e => ({
  type: CHANGE_TITLE,
  payload: e.target.value,
})

export const postBlog = (title, body) => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  today = `${yyyy}-${mm}-${dd}`;
  axios.post('/api/postblog', {
    title,
    body,
    date: today,
  }).then((res) => {
  }).catch((error) => {
    console.log(error)
  })
  return {
    type: RESET,
  }
}

export default function reducer(state = initialState, action) {
  const { payload, type } = action
  switch (type) {
    case CHANGE_BODY:
      return { ...state, body: payload }
    case CHANGE_TITLE:
      return { ...state, title: payload }
    case RESET:
      return initialState
    default:
      return state
  }
}