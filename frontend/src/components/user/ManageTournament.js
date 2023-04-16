import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";
import CreateMatch from "./CreateMatch";
import ManagePlayer from "./ManagePlayer";
import ManageMatches from "./ManageMatches";
import ManageScores from "./ManageScores";
import ManageCategories from "./ManageCategories";

const ManageTournament = () => {
  const { tour_id } = useParams();
  const url = app_config.apiUrl;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [tournamentList, setTournamentList] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selTournament, setSelTournament] = useState(null);

  const getUserTournament = async () => {
    setLoading(true);
    const res = await fetch(`${url}/tournament/getbyuser/${currentUser._id}`);
    console.log(res.status);
    setLoading(false);

    if (res.status === 200) {
      const data = (await res.json()).result;
      setTournamentList(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getUserTournament();
  }, []);

  const showTournamentGames = () => {
    if (selTournament) {
      return "";
    }
  };

  const displayTabs = () => {
    if (selTournament !== null)
      return (
        <>
          <ul className="nav nav-tabs mb-3" id="ex-with-icons" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="ex-with-icons-tab-1"
                data-mdb-toggle="tab"
                href="#ex-with-icons-tabs-1"
                role="tab"
                aria-controls="ex-with-icons-tabs-1"
                aria-selected="true"
              >
                <i className="fas fa-chart-pie fa-fw me-2" />
                Players
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="ex-with-icons-tab-2"
                data-mdb-toggle="tab"
                href="#ex-with-icons-tabs-2"
                role="tab"
                aria-controls="ex-with-icons-tabs-2"
                aria-selected="false"
              >
                <i className="fas fa-chart-line fa-fw me-2" />
                Matches
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="ex-with-icons-tab-3"
                data-mdb-toggle="tab"
                href="#ex-with-icons-tabs-3"
                role="tab"
                aria-controls="ex-with-icons-tabs-3"
                aria-selected="false"
              >
                <i className="fas fa-cogs fa-fw me-2" />
                Categories
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="ex-with-icons-tab-4"
                data-mdb-toggle="tab"
                href="#ex-with-icons-tabs-4"
                role="tab"
                aria-controls="ex-with-icons-tabs-4"
                aria-selected="false"
              >
                <i className="fas fa-cogs fa-fw me-2" />
                Scores
              </a>
            </li>
          </ul>
          <div className="tab-content" id="ex-with-icons-content">
            <div
              className="tab-pane fade show active"
              id="ex-with-icons-tabs-1"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-1"
            >
              <ManagePlayer tournamentData={tournamentList[selTournament]} />
            </div>
            <div
              className="tab-pane fade"
              id="ex-with-icons-tabs-2"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-2"
            >
              <ManageMatches tournamentData={ tournamentList[selTournament] } />
            </div>
            <div
              className="tab-pane fade"
              id="ex-with-icons-tabs-3"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-3"
            >
              <ManageCategories tournamentData={tournamentList[selTournament]} refreshData={getUserTournament} />
            </div>
            <div
              className="tab-pane fade"
              id="ex-with-icons-tabs-4"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-4"
            >
              <ManageScores />
            </div>
          </div>
        </>
      );
  };

  return (
    <div>
      <h1>ManageTournament</h1>
      <hr />

      <div className="row">
        <div className="col-2">
        
            {
                tournamentList &&
                tournamentList.map((tournament, index) => (
                    <button onClick={e => setSelTournament(index)} className="btn btn-danger mt-3">{tournament.title}</button>
                ))
            }
  

        </div>
        <div className="col-8">
          <div className="p-4">{displayTabs()}</div>
        </div>
      </div>

      {/* <CreateMatch /> */}
    </div>
  );
};

export default ManageTournament;
