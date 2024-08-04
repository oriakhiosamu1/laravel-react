// import React from 'react'
import { useEffect, useState } from 'react';
import './users.css';
import AxiosClient from '../../axios/axios-client';
import { Link } from 'react-router-dom';
import SimplePaginate from '../../Pagination/SimplePaginate';
import Notification from '../../Notification/Notification';
// import AdminNav from '../../components/AdminNav';

const Users = ({searchInput}) => {
// const Users = () => {

    // VARIABLES =========================================================================================================================
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [count, setCount] = useState(1);
    const [paginate, setPaginate] = useState({})

    // NOTIFICATION====================================================================================================================
    const [notify, setNotify] = useState(false);
    // VARIABLES ================================================================================================================================

    useEffect(()=>{
        getUsers();
    }, [count])

    // FETCH USERS FUNCTION============================================================================================================================
    function getUsers(){

        setIsLoading(true);

        // AxiosClient.get('/users')
        AxiosClient.get(`/users?page=${count}`)
        .then(({data})=>{
            setIsLoading(false);
            setUsers(data.data);
            console.log(data)

            // SETTING PAGINATION
            setPaginate(data.meta)

            // SHOW NOTIFICATION
            setNotify(true)
        })
        .catch(()=>{
            setIsLoading(false);
        })
    }
    // FETCH USER FUNCTION ==============================================================================================================================


    // SET-TIMEOUT FUNCTION ==========================================================================================================================
    setTimeout(()=>{
        setNotify(false);
    }, 4000)
    // SET-TIMEOUT FUNCTION =========================================================================================================================


    // DELETE FUNCTION =================================================================================================================================
    function onDelete(user){
        if(!window.confirm('Are you sure you want to delete user?')){
            return
        }

        AxiosClient.delete(`/users/${user.id}`)
        .then(()=>{
            // SHOW NOTIFICATION
            setNotify(true)
            getUsers();
        })
    }
    // DELETE FUNCTION ====================================================================================================================================


    // IMPLEMENTING SEARCH FUNCTION =====================================================================================================================================
    console.log(searchInput);
    const filter = users.filter((user)=>{
        return user.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    let filteredSearch = '';
    // if((searchInput.length === null) || (searchInput.length === undefined)){
    if(searchInput.length === null){
        filteredSearch = users
    }else{
        filteredSearch = filter
    }
    // IMPLEMENTING SEARCH FUNCTION =====================================================================================================================================

  return (
    <div className="content">

        {/* <AdminNav /> */}
        {notify && <Notification />}

        <div className="container">
        <h2 className="mb-5">{isLoading ? 'Fetching Users...' : 'Users Table'}</h2>


        <div className="table-responsive">

            <table className="table table-striped custom-table">
            <thead>
                <tr>

                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* {users.map((user, index)=>{
                    return (
                        <tr key={index} scope="row">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            <td><Link to={`/users/${user.id}`}>Edit</Link></td>
                            <td><button onClick={(e)=>onDelete(user)} style={{ backgroundColor:'#c0a21b', color:'white', padding:'5px 10px', borderRadius:'5px', borderStyle:'none' }}>Delete</button></td>
                        </tr>
                    )
                })} */}

                {filteredSearch.map((user, index)=>{
                    return (
                        <tr key={index} scope="row">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            <td><Link to={`/users/${user.id}`}>Edit</Link></td>
                            <td><button onClick={(e)=>onDelete(user)} style={{ backgroundColor:'#c0a21b', color:'white', padding:'5px 10px', borderRadius:'5px', borderStyle:'none' }}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>

            <SimplePaginate paginate={paginate} count={count} setCount={setCount} />

        </div>

    </div>
  )
}

export default Users
