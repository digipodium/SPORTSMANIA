import { useFormik } from "formik";
import React, { useState } from "react";
import app_config from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateTournament = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const { games, apiUrl } = app_config;
  const navigate = useNavigate();

  const tournamentForm = useFormik({
    initialValues: {
      title: "",
      game: "",
      description: "",
      createdBy: currentUser._id,
      players: [],
      created_at: new Date(),
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch(apiUrl + "/tournament/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 200) {
        const data = (await res.json()).result;
        console.log(data);
        Swal.fire({
          title: "Success!",
          text: "Tournament Created Successfully",
          icon: "success",
        });
        navigate("/user/managetournament");
      }else{
        Swal.fire({
          title: "Error!",
          text: "Some Error Occured",
          icon: "error",
        });
      }
    },
  });

  return (
    <div>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage: 'url("/back_img.png")',
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-8">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create New Tournament
                    </h2>
                    <form onSubmit={tournamentForm.handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-4">
                            <label
                              className="form-label"
                              htmlFor="form3Example1cg"
                            >
                              Title
                            </label>

                            <input
                              type="text"
                              id="title"
                              onChange={tournamentForm.handleChange}
                              value={tournamentForm.values.title}
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className=" mb-4">
                            <label
                              className="form-label"
                              htmlFor="form3Example3cg"
                            >
                              Game
                            </label>
                            <select
                              id="game"
                              onChange={tournamentForm.handleChange}
                              value={tournamentForm.values.game}
                              className="form-control form-control-lg"
                            >
                              {games
                                .map((game) => (
                                  <option value={game.name}>{game.name}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label" htmlFor="form3Example4cg">
                          Description
                        </label>
                        <textarea
                          id="description"
                          onChange={tournamentForm.handleChange}
                          value={tournamentForm.values.description}
                          className="form-control form-control-lg"
                        ></textarea>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block btn-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateTournament;
