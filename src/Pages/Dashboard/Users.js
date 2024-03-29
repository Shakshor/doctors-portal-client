import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
    // using react query
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`  https://doctors-portal-server-eze2.onrender.com/user`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        console.log(res);
        return res.json();
    }))

    // loading(length problem solving)
    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className='text-2xl'>All Users:{users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <UserRow key={user._id} user={user} refetch={refetch}></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;