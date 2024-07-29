// import React from 'react'
import { useEffect, useState } from 'react';
import './users.css';
import AxiosClient from '../../axios/axios-client';
import { Link } from 'react-router-dom';
// import AdminNav from '../../components/AdminNav';

// const Users = (props) => {
const Users = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [count, setCount] = useState(1);

    useEffect(()=>{
        getUsers();
    }, [])

    function getUsers(){

        setIsLoading(true);

        AxiosClient.get('/users')
        .then(({data})=>{
            setIsLoading(false);
            setUsers(data.data);
            console.log(data)
        })
        .catch(()=>{
            setIsLoading(false);
        })
    }

    function onDelete(user){
        if(!window.confirm('Are you sure you want to delete user?')){
            return
        }

        AxiosClient.delete(`/users/${user.id}`)
        .then(()=>{
            // SHOW NOTIFICATION
            getUsers();
        })
    }

    // FILTERED ITEMS FUNCTION
    // const searchedInput = users.filter(user => user.toLowerCase().includes(props.searchInput.toLowerCase()));

  return (
    <div className="content">

        {/* <AdminNav /> */}

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
                {users.map((user, index)=>{
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

                {/* {searchedInput && searchedInput.map((user, index)=>{
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
            </tbody>
            </table>
        </div>


        </div>

    </div>
  )
}

export default Users
