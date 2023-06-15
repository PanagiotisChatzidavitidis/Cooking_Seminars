import React, { useState, useEffect } from 'react';
import SeminarCard from './SeminarCard';
import { getSeminarData } from './api'; // Assuming you have an API file to fetch seminar data

const Seminars = () => {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    // Fetch seminar data from the API
    const fetchData = async () => {
      try {
        const data = await getSeminarData();
        setSeminars(data); // Assuming data is an array of seminar objects
      } catch (error) {
        console.error('Error fetching seminar data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Seminars</h1>
      {seminars.length > 0 ? (
        seminars.map(seminar => (
          <SeminarCard
            key={seminar.id}
            title={seminar.name}
            date={seminar.date_start}
            location={seminar.location}
            description={seminar.description}
            seats={seminar.available_seats}
            difficulty={seminar.difficulty}
          />
        ))
      ) : (
        <p>No seminars available at the moment.</p>
      )}
    </div>
  );
};

export default Seminars;