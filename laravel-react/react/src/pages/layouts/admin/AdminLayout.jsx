// import { useEffect } from 'react'
import { useState } from 'react'
import AdminNav from '../../../components/AdminNav'
// import AxiosClient from '../../../axios/axios-client'
import { useStateContext } from '../../../contexts/ContextProvider'
import Users from '../../users/Users'
// import { Navigate } from 'react-router-dom'

const AdminLayout = () => {
    // const {setUser} = useStateContext();

    // useEffect(()=>{
    //     AxiosClient.get('/user')
    //     .then(({data})=>{
    //         setUser(data);
    //     })
    // }, []);

    const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      <AdminNav searchInput={searchInput} setSearchInput={setSearchInput} />
      <Users searchInput={searchInput} />
    </div>
  )
}

export default AdminLayout
