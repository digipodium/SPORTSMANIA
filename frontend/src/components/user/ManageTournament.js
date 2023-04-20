import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";
import CreateMatch from "./CreateMatch";
import ManagePlayer from "./ManagePlayer";
import ManageMatches from "./ManageMatches";
import ManageScores from "./ManageScores";
import ManageCategories from "./ManageCategories";
import ManageTeam from "./ManageTeams";

const ManageTournament = () => {
  const { tour_id } = useParams();
  const url = app_config.apiUrl;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const { games } = app_config;

  const [tournamentList, setTournamentList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTeam, setIsTeam] = useState(false);

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
            {isTeam && (
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="ex-with-icons-tab-5"
                  data-mdb-toggle="tab"
                  href="#ex-with-icons-tabs-5"
                  role="tab"
                  aria-controls="ex-with-icons-tabs-5"
                  aria-selected="false"
                >
                  <i className="fas fa-cogs fa-fw me-2" />
                  Teams
                </a>
              </li>
            )}
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
              <ManageMatches tournamentData={tournamentList[selTournament]} />
            </div>
            <div
              className="tab-pane fade"
              id="ex-with-icons-tabs-3"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-3"
            >
              <ManageCategories
                tournamentData={tournamentList[selTournament]}
                refreshData={getUserTournament}
              />
            </div>
            <div
              className="tab-pane fade"
              id="ex-with-icons-tabs-4"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-4"
            >
              <ManageScores tournamentData={tournamentList[selTournament]} />
            </div>

            <div
              className="tab-pane fade"
              id="ex-with-icons-tabs-5"
              role="tabpanel"
              aria-labelledby="ex-with-icons-tab-5"
            >
              <ManageTeam tournamentData={tournamentList[selTournament]} />
            </div>
          </div>
        </>
      );
  };

  const selectTournament = (tournament, index) => {
    setSelTournament(index);
    console.log(games);
    for (let game of games) {
      if (game.name === tournament.game) {
        setIsTeam(game.type === "team");
        break;
      }
    }
  };

  return (
    <div style={{ backgroundImage: `url("/pattern.png")`, minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="card mt-5">
              <div className="card-header">
                <h3>My Tournaments</h3>
              </div>
              <div className="card-body">
                {tournamentList &&
                  tournamentList.map((tournament, index) => (
                    <button
                      onClick={(e) => selectTournament(tournament, index)}
                      className="btn btn-danger mt-3 w-100"
                    >
                      {tournament.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="p-5">
              <h1 className="display-4">ManageTournament</h1>
              <hr />

              {selTournament !== null ? (
                displayTabs()
              ) : (
                <p className="display-1 mt-5" style={{ color: "#aaa" }}>
                  Choose a Tournament to View and Manage
                </p>
              )}
            </div>
          </div>
        </div>

        {/* <CreateMatch /> */}
      </div>
    </div>
  );
};

export default ManageTournament;
