import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Job from "./Job";
import { Link } from "react-router-dom";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.trim() === "") {
      setJobs([]);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchJobs = async () => {
      try {
        const response = await fetch(baseEndpoint + query + "&limit=20");
        const result = await response.json();
        if (response.ok) {
          setJobs(result.data);
        } else {
          setError("Error fetching results");
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchJobs, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
          <Link to="/favourites">Vai ai preferiti</Link>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>

        <Col xs={10} className="mx-auto mb-5">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {jobs.length > 0
            ? jobs.map((jobData) => <Job key={jobData._id} data={jobData} />)
            : !loading && <p>No results found.</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
