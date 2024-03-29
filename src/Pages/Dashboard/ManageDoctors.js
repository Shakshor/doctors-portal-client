import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
    // For Deleting doctor 
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    // using react query
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('  https://doctors-portal-server-eze2.onrender.com/doctor', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className='text-2xl'>Manage Doctors:{doctors.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <DoctorRow
                                key={doctor._id}
                                doctor={doctor}
                                index={index}
                                refetch={refetch}
                                setDeletingDoctor={setDeletingDoctor}
                            ></DoctorRow>)

                        }
                    </tbody>
                </table>
            </div>

            {/* -------- For Delete Confirm Modal ------- */}
            {
                deletingDoctor && <DeleteConfirmModal
                    deletingDoctor={deletingDoctor}
                    refetch={refetch}
                    setDeletingDoctor={setDeletingDoctor}
                ></DeleteConfirmModal>
            }

        </div>
    );
};

export default ManageDoctors;