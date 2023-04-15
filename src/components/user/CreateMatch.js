import React, { useEffect, useState } from 'react'
import app_config from '../../config';
import { useFormik } from 'formik';

const CreateMatch = ({tournamentId}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    const url = app_config.apiUrl;

    const [playerList, setPlayerList] = useState([]);

    const matchForm = useFormik({
        initialValues: {
            title: '',
            type: '',
            description: '',
            playerA: '',
            playerB: '',
            tournament: tournamentId,
            scheduled: new Date(),
            duration: 0,
        },
        onSubmit: async (values) => {
            console.log(values);
        }
    });

    const getPlayerList = async () => {
        const res = await fetch(`${url}/player/getbyuser/${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        setPlayerList(data.result);
    };

    useEffect(() => {
        getPlayerList();
    }, []);



  return (
    <div>
        <div className='container'>
            <form onSubmit={matchForm.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' className='form-control' id='title' name='title' onChange={matchForm.handleChange} value={matchForm.values.title} list="title-list" />
                    <datalist id="title-list">
                        <option value="menSingles">Men Singles</option>
                        <option value="menDoubles">Men Doubles</option>
                        <option value="womenSingles">Women Single</option>
                        <option value="womenDoubles">Women Doubles</option>
                    </datalist>
                </div>
                <div className='form-group'>
                    <label htmlFor='type'>Type</label>
                    <input type='text' className='form-control' id='type' name='type' onChange={matchForm.handleChange} value={matchForm.values.type} list='type-list' />
                    <datalist id="type-list">
                        <option value="regular">Regular</option>
                        <option value="final">Final</option>
                        <option value="semiFinal">Semi Final</option>
                        <option value="quarterFinal">Quarter Final</option>
                    </datalist>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' className='form-control' id='description' name='description' onChange={matchForm.handleChange} value={matchForm.values.description} />
                </div>
                <div className='form-group'>
                    <label htmlFor='playerA'>Player A</label>
                    <select className='form-control' id='playerA' name='playerA' onChange={matchForm.handleChange} value={matchForm.values.playerA}>
                        <option value=''>Select Player</option>
                        {playerList.map((player) => {
                            return (
                                <option value={player._id}>{player.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='playerB'>Player B</label>
                    <select className='form-control' id='playerB' name='playerB' onChange={matchForm.handleChange} value={matchForm.values.playerB}>
                        <option value=''>Select Player</option>
                        {playerList.map((player) => {
                            return (
                                <option value={player._id}>{player.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='scheduled'>Scheduled</label>
                    <input type='datetime-local' className='form-control' id='scheduled' name='scheduled' onChange={matchForm.handleChange} value={matchForm.values.scheduled} />
                </div>
                <div className='form-group'>
                    <label htmlFor='duration'>Duration</label>
                    <input type='number' className='form-control' id='duration' name='duration' onChange={matchForm.handleChange} value={matchForm.values.duration} />
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>

                
            </form>
        </div>
    </div>
  )
}

export default CreateMatch