import styled from '@emotion/styled';
import { Route, Routes, Link } from 'react-router-dom';
import { Offer } from '@job-board/api-interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OfferBox } from './offer';

const StyledApp = styled.div`
  // Your style here
`;

export const App = () => {
  const [data, setData] = useState<Offer[]>([]);

  useEffect(() => {
    axios.get<Offer[]>('http://localhost:3333/offers')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }, []);

  return (
    <StyledApp>
      <br />
      {data.map(offer => <OfferBox offer={offer} />)}
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
