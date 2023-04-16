import React, { useState } from "react";
import { useFormik } from "formik";
import app_config from "../../config";

const CreateGame = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const url = app_config.apiUrl;

  const gameForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      game: "",
      team: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    onSubmit: async (values, {}) => {
      console.log(values);
      const res = await fetch(`${url}/tournament/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        const data = (await res.json()).result;
        console.log("Tournament Created");
        console.log(data);  
      }
    },
  });

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#2779e2" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-white mb-4">Apply for a job</h1>
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body">
                  <form onSubmit={gameForm.handleSubmit}>
                    <div className="row align-items-center pt-4 pb-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Game Title</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="title"
                          onChange={gameForm.handleChange}
                          value={gameForm.values.title}
                        />
                      </div>
                    </div>
                    <div className="row align-items-center pt-4 pb-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Game</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="game"
                          onChange={gameForm.handleChange}
                          value={gameForm.values.game}
                          list="games"
                        />
                        <datalist id="games">
                          <option value="cricket">Cricket</option>
                          <option value="badminton">Badminton</option>
                        </datalist>
                      </div>
                    </div>
                    <div className="row align-items-center pt-4 pb-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Game Description</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="description"
                          onChange={gameForm.handleChange}
                          value={gameForm.values.description}
                        />
                      </div>
                    </div>
                    <div className="row align-items-center pt-4 pb-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Team</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="checkbox"
                          className=""
                          id="description"
                          onChange={gameForm.handleChange}
                          value={gameForm.values.team}
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
                        />
                        <div className="small text-muted mt-2">
                          Upload your CV/Resume or any other relevant file. Max
                          file size 50 MB
                        </div>
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

export default CreateGame;
