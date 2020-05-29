import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewJobForm from './NewJobForm';
import EditJobForm from './EditJobForm';
import Job from './Job';

const JobsList = props => {
  // set our inital form state to be empty
  const initialFormState = {
    company: '',
    position: '',
    description: '',
  };

  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(initialFormState);

  useEffect(() => {
    axios.get('/api/v1/jobs.json').then(res => {
      setJobs(res.data);
    });
  }, []);

  // post the job object to the api
  // we call this function from the form, so the
  // values will populate with those of the new job
  const addJob = job => {
    // qs is a querystring parser/stringifier
    const qs = require('qs');
    axios
      .post(
        '/api/v1/jobs/',
        qs.stringify({
          job: {
            company: job.company,
            position: job.position,
            description: job.description,
          },
        })
      )
      .then(res => console.log(res))
      .catch(error => console.log(error));

    console.log(jobs);
    setJobs([...jobs, job]);
  };

  const editJob = job => {
    setEditing(true);
    setCurrentJob({
      id: job.id,
      company: job.company,
      position: job.position,
      description: job.description,
    });
  };

  const updateJob = updatedJob => {
    setEditing(false);

    const qs = require('qs');
    axios
      .patch(
        '/api/v1/jobs/' + updatedJob.id,
        qs.stringify({
          job: {
            company: updatedJob.company,
            position: updatedJob.position,
            description: updatedJob.description,
          },
        })
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
    // set our jobs array to a new array
    // if the id of a job is equal to the id of an updated job,
    // set that job to be the updated version in our array
    // if it doesn't have an updated id, use the original job
    setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
  };

  const removeJob = id => {
    axios
      .delete('/api/v1/jobs/' + id)
      .then(res => {
        // filter our jobs array to include only those
        // where the id is not the id of the job that
        // we're deleting
        setJobs(jobs.filter(job => job.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="jobs-list">
        <div>
          {editing ? (
            <EditJobForm
              setEditing={setEditing}
              currentJob={currentJob}
              updateJob={updateJob}
            />
          ) : (
            <NewJobForm
              addJob={addJob}
              initialFormState={initialFormState}
              editing={editing}
              updateJob={updateJob}
            />
          )}
        </div>
        <br />
        <hr />
        {jobs.map((job, i) => (
          <Job
            job={job}
            key={i}
            removeJob={removeJob}
            editJob={editJob}
            editing={editing}
          />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
