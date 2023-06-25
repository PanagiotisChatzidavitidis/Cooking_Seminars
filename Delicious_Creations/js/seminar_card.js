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
    <div className="container">
      <div className="row justify-content-center">
        {seminars.length > 0 ? (
          seminars.map((seminar) => (
            <div className="col-md-4 mb-4" key={seminar._id}>
              <SeminarCard seminar={seminar} />
            </div>
          ))
        ) : (
          <p>No seminars available at the moment.</p>
        )}
      </div>
    </div>
  );
};

// Render the Seminars component inside the seminarContainer element
ReactDOM.render(<Seminars />, document.getElementById('seminarContainer'));
