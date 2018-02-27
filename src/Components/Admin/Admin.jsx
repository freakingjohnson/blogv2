import React from 'react'
import NewBlog from './SubComps/NewBlog'
import UploadImg from './SubComps/UploadImg'
import DeleteImg from './SubComps/DeleteImg'
import EditBlog from './SubComps/EditBlog'

const Admin = () => (
  <div>
    <NewBlog />
    <EditBlog />
    <UploadImg />
    <DeleteImg />
  </div>
)

export default Admin