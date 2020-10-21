import React, { useState } from "react";

import {
  Container,
  Spinner,
} from "react-bootstrap";

import Job from "./components/Job";
import JobsPagination from "./components/JobsPagination";
import SearchForm from "./components/SearchForm";

import useFetchJobs from "./hooks/useFetchJobs";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const {
    jobs,
    loading,
    error,
    hasNextPage,
  } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs </h1>
      <SearchForm
        params={params}
        onParamChange={handleParamChange}
      />
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
      {loading && (
        <Spinner
          animation="border"
          role="status"
          className="mb-2"
        >
          <span className="sr-only">
            Loading...
          </span>
        </Spinner>
      )}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
      <p>Petras Vilkelis &copy; 2020</p>
    </Container>
  );
}

export default App;
