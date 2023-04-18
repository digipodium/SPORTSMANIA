import React, { useEffect, useState } from 'react'
import app_config from '../../config';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

const ScoreUpdateScreen = ({matchData}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [score, setScore] = useState({team1: 0, team2: 0});
  const [loading, setLoading] = useState(false);
  const {apiUrl} = app_config;
  const [selMatch, setSelMatch] = useState(null);
  


  const updateScore = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/match/update/${matchData._id}`, {
      method: "PUT",
      body: JSON.stringify({
        score
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);
    setLoading(false);
  }


  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Score</h4>
            <div className="input-group">
              <input type="number" className="form-control" placeholder="Team 1 Score" value={score.team1} onChange={e => setScore({...score, team1: e.target.value})} />
              <input type="number" className="form-control" placeholder="Team 2 Score" value={score.team2} onChange={e => setScore({...score, team2: e.target.value})} />
              <button onClick={updateScore} className="btn btn-success">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ManageScores = ({tournamentData}) => {

  const [matchList, setMatchList] = useState([]);
  const {apiUrl} = app_config;
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [loading, setLoading] = useState(false);
  const [selMatch, setSelMatch] = useState(null);


  const fetchMatchList = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/match/getbytournament/${tournamentData._id}`);
    const data = await res.json();
    console.log(data);
    setMatchList(data.result);
    setLoading(false);
  }

  useEffect(() => {
    fetchMatchList();
  }, []);

  const checkMatchStarted = (beginTime) => {
    return new Date(beginTime) < new Date();
  }

  const displayScoreWindow = (match) => {

  }

  const deleteMatch = async (id) => {
    
    const res = await fetch(`${apiUrl}/match/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);
  toast.success("Match Deleted Successfully");
    fetchMatchList();
  }





  const displayMatches = () => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      return matchList.map((match, index) => (
        <div className="card mb-3">
          <div className="card-header">
            <p className="m-0">({match.title})</p>
            <h3 className="float-end">{new Date(match.scheduled).toLocaleDateString()} {new Date(match.scheduled).toLocaleTimeString()}</h3>
            {
              checkMatchStarted(match.scheduled) ?
              <span className="badge badge-success bg-success">Match Live</span>
              :
              <span className="badge badge-secondary bg-secondary">Not Started Yet</span>
            }
            <button className='btn btn-primary' data-mdb-toggle="modal" data-mdb-target="#scoreModal" onClick={e => setSelMatch(index)}>Update Score</button>
            <button className='btn btn-danger' onClick={e => deleteMatch(match._id)}>
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div className="card-body">
            <div className="row justify-content-around align-items-center">
              <div className="col-md-4">
                <img
                  src={
                    match.playerA.image
                      ? apiUrl + "/" + match.playerA.image
                      : "/player.png"
                  }
                  alt=""
                  className="img-fluid"
                />
                <h4>{match.playerA.name}</h4>
              </div>
              <div className="col-md-2">
                <img className="img-fluid" src="/vs.jpg" alt="" />
              </div>
              <div className="col-md-4">
                <img
                  src={
                    match.playerB.image
                      ? apiUrl + "/" + match.playerB.image
                      : "/player.png"
                  }
                  alt=""
                  className="img-fluid"
                />
                <h4 className="text-center">{match.playerB.name}</h4>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  };


  return (
    <div>

  <div
    className="modal fade"
    id="scoreModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Match Scores
          </h5>
          <button
            type="button"
            className="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <h1>Match Scores</h1>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-mdb-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>


      <div className="container-fluid">

        <div className="row">
          <div className="col-md-10 mx-auto">
            {displayMatches()}
          </div>

      </div>
    </div>
    </div>
  )
}

export default ManageScores