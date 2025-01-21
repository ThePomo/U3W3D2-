import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavourite } from "../redux/reducer/reducer";
import { Container, Row, Col, Button } from "react-bootstrap";

const FavouritesPage = () => {
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Aziende Preferite</h1>
          <Link to="/" className="btn btn-outline-primary mb-3">
            Torna alla Home
          </Link>
          {favourites.length > 0 ? (
            favourites.map((company) => (
              <Row
                key={company}
                className="mx-0 mt-3 p-3"
                style={{ border: "1px solid #00000033", borderRadius: 4 }}
              >
                <Col xs={9}>
                  <Link to={`/${company}`}>{company}</Link>
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(removeFavourite(company))}
                  >
                    Rimuovi
                  </Button>
                </Col>
              </Row>
            ))
          ) : (
            <p>Non ci sono aziende preferite al momento.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FavouritesPage;
