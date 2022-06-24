import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    // Handle error from react hook form
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    // react query
    const { data: services, isLoading } = useQuery('services', () => fetch(' http://localhost:5000/service').then(res => res.json()))

    // third party storage (imgbb)
    const imageStorageKey = '3529629c25e2110da0467cf68205fc25';

    /**
     * 1. Third party storage // Free open public storage is ok for practice project
     * 2. Your own storage in your own server (file system)
     * 3. Database: Mongodb
     * 
     * YUP: to validate file: Search: Yup file validation for react hook form
    */

    // form submit handler
    const onSubmit = (data) => {
        // console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                // console.log('imgbb', result);
                if (result.success) {
                    const img = result.data.url; // image url
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    // send doctor info to backend
                    fetch(` http://localhost:5000/doctor`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        // insertedId is found after response of backend server
                        .then(inserted => {
                            // console.log('doctor', inserted);
                            if (inserted.insertedId) {
                                toast.success('Doctor added successfully');
                                reset();
                            }
                            else {
                                toast.error('Failed to add the doctor');
                            }
                        })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl'>Add a New Doctor.</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* ---- input design ----- */}
                {/* --- name input field ------ */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                {/* --- email input field ------ */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"
                        placeholder="Email Address"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                {/* ----- specialty input field ------ */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select select-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option>)
                        }
                    </select>
                </div>

                {/* ----- image input field ------ */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <input className='btn w-full max-w-xs text-white' type="submit" value='Add' />
            </form>
        </div>
    );
};

export default AddDoctor;