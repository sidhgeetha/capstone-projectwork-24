import React from "react";
import jobServices from "../services/jobservices";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const jobs = await jobServices.getAllJobs();
  return { jobs };
}

const AllJobs = () => {
  const { jobs } = useLoaderData();


 console.log(jobs.data.jobs);

  return (
    <div>
      <h1>All Jobs</h1>
      <ul>
        {jobs.data.jobs.map((job) => (
          <li key={job._id}>
            <h2>{job.company}</h2>
            <p>{job.position}</p>
            <p>{job.jobLocation}</p>
            <p>{job.jobType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllJobs;
