import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SeminarCard from './SeminarCard';
import axios from 'axios';

const Seminars = () => {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await axios.get('/seminars'); // Modify the endpoint if needed
        setSeminars(response.data);
      } catch (error) {
        console.error('Error fetching seminars:', error);
      }
    };

    fetchSeminars();
  }, []);

  return (
    <div>
      <h1>Seminars</h1>
      {seminars.length > 0 ? (
        seminars.map(seminar => (
          <SeminarCard key={seminar._id} seminar={seminar} />
        ))
      ) : (
        <p>No seminars available at the moment.</p>
      )}
    </div>
  );
};

// Render the Seminars component inside the seminarCardsContainer element
ReactDOM.render(<Seminars />, document.getElementById('seminarCardsContainer'));
