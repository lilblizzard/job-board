import React, { useState } from 'react';

const NewJobForm = props => {
  // job is our state variable, and setJob is our setState function,
  // which updates our state variable

  // set job accepts a new state value and enqueus a component re-render
  const [job, setJob] = useState(props.initialFormState);

  const handleInputChange = e => {
    // grab the name and the value from our input
    // `const name = e.target.name`
    // `const value = e.target.value`
    const { name, value } = e.target;

    // every time the input changes, update the job.
    // do we spread job because the whole component is refreshing
    // and we need to persist the job data through refreshes?

    // update the appropriate key-value pair
    // in the job object
    setJob({ ...job, [name]: value });
    console.log(job);

    // TODO: log the job and see what it actually looks like
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log('Submitted.');
        // if any of these are empty, stop the function from
        // adding the job
        if (!job.description || !job.company || !job.position) return;
        // access the function on our parent component and add job
        props.addJob(job);
        console.log(job);
        // reset the form fields
        setJob(props.initalFormState);
        console.log(job);
      }}
    >
      <label>Company</label>
      <input
        type="text"
        name="company"
        value={job.company} //why doesn't job exist here, but exists everywhere else?
        //send the event information to our function
        onChange={handleInputChange}
      ></input>
      <label>Position</label>
      <input
        type="text"
        name="position"
        value={job.position}
        onChange={handleInputChange}
      ></input>
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={job.description}
        onChange={handleInputChange}
      ></input>
      <button>Create Job</button>
    </form>
  );
};

export default NewJobForm;
