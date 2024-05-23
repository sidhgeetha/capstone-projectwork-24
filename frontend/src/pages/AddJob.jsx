

import React from "react";
import jobServices from "../services/jobservices";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
    const navigate = useNavigate();

  const createJob = async (e) => {
    e.preventDefault();
    const company = e.target[0].value;
    const position = e.target[1].value;
    const location = e.target[2].value;
    const type = e.target[3].value;

    const job = {
      company,
      position,
      location,
      type,
    };

    try {
      const response = await jobServices.createJob(job);
      console.log(response.data);

     
      
      // clear the form data
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create a new Job</h1>
      <form onSubmit={createJob}>
        <div>
          <input type="text" placeholder="Company..." /> &nbsp;&nbsp;
          <input type="text" placeholder="Position..." />
        </div>

        <br />

        <div>
          <input type="text" placeholder="Location..." /> &nbsp;&nbsp;
          <select>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <br />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
