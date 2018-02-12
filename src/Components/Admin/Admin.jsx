import React from 'react'
import NewBlog from './SubComps/NewBlog'
import UploadImg from './SubComps/UploadImg'
import DeleteImg from './SubComps/DeleteImg';

const Admin = () => (
  <div>
    <NewBlog />
    <UploadImg />
    <DeleteImg />
  </div>
)

export default Admin