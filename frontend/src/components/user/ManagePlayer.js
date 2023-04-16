import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import app_config from "../../config";
import { toast } from "react-hot-toast";

const AddPlayer = ({refreshPlayerList, tournamentData}) => {
  // console.log(tournamentData);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [selImage, setSelImage] = useState('');
  const url = app_config.apiUrl;

  const playerForm = useFormik({
    initialValues: {
      name: "",
      tournament: tournamentData._id,
      image: "",
      playerData: {},
      created_at: new Date(),
      updated_at: new Date(),
    },

    onSubmit: async (values, {}) => {
      values.image = selImage;
      console.log(values);
      const res = await fetch(`${url}/player/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        const data = (await res.json()).result;
        console.log("Player Created");
        console.log(data);
        refreshPlayerList();
      }
    },
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setSelImage(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        toast.success("File Uploaded!!");
      }
    });
  }

  return (
    <div>
      <section className="py-5" style={{ backgroundColor: "#2779e2" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-white mb-4">Apply for a job</h1>
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body">
                  <form onSubmit={playerForm.handleSubmit}>
                    <div className="row align-items-center pt-4 pb-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Player Name</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          onChange={playerForm.handleChange}
                          value={playerForm.values.name}
                        />
                      </div>
                    </div>

                    <hr className="mx-n3" />
                    <div className="row align-items-center py-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Upload CV</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          maxFileSize="2000000"
                          onChange={uploadImage}

                          // 2mb
                        />
                        
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="px-5 py-4">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Send application
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ManagePlayer = ({tournamentData}) => {
  const [playerList, setPlayerList] = useState([]);
  const url = app_config.apiUrl;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // console.log(tournamentData);
  const getPlayerList = async () => {
    const res = await fetch(`${url}/player/getbytournament/${tournamentData._id}`);
    const data = await res.json();
    console.log(data);
    setPlayerList(data.result);
  };

  useEffect(() => {
    getPlayerList();
  }, []);

  const displayPlayers = () => {
    return playerList.map((player) => {
      return (
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src={url+'/'+player.image} alt="" />
            <div className="card-body">
              <h5 className="card-title">{player.name}</h5>
              <p className="card-text">{player.playerData}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <AddPlayer refreshPlayerList={getPlayerList} tournamentData={tournamentData} />
      <div className="container">
        <div className="row">{displayPlayers()}</div>
      </div>
    </div>
  );
};

export default ManagePlayer;
