import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_USER_BASIC, GET_CONTRIBUTION_CALENDAR } from './graphql/queries';
import { Header, Calendar, Contributions, IntroModal } from './components/index';

const years = [2023, 2024, 2025];
const login = 'kami123kaze'; 

function App() {
  const [user, setUser] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false); 
  const [useUrlParams, setUseUrlParams] = useState(true);

  // 1. Parse URL params on first load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    if (from) {
      const parsedYear = new Date(from).getFullYear();
      if (years.includes(parsedYear)) {
        setYear(parsedYear);
      }
    }
  }, []);

  // Check localStorage for modal status
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowModal(true);
    }
  }, []);

  //  Handle modal close
  const handleCloseModal = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowModal(false);
  };

  // 2. Fetch GitHub user info
  useEffect(() => {
    axios
      .post(
        'https://api.github.com/graphql',
        {
          query: GET_USER_BASIC,
          variables: { login },
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )
      .then(res => setUser(res.data.data.user));
  }, []);

  //  Fetch contributions when year changes
  useEffect(() => {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    axios
      .post(
        'https://api.github.com/graphql',
        {
          query: GET_CONTRIBUTION_CALENDAR,
          variables: { login, from, to },
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      )
      .then(res => {
        const weeks =
          res.data.data.user.contributionsCollection.contributionCalendar.weeks;
        setCalendar(weeks);
      });
  }, [year]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center">
      {showModal && <IntroModal onClose={handleCloseModal} />}
      <div className="w-full max-w-5xl px-4">
        <Header
          user={user}
          useUrlParams={useUrlParams}
          setUseUrlParams={setUseUrlParams}
        />

        {/* Year Links */}
        <div className="flex gap-2 mt-4 mb-4 justify-center">
          {years.map(yr => {
            const from = `${yr}-01-01T00:00:00Z`;
            const to = `${yr}-12-31T23:59:59Z`;
            const isActive = yr === year;

            return (
              <a
                key={yr}
                href={`?from=${from}&to=${to}`}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  isActive
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {yr}
              </a>
            );
          })}
        </div>

        <Calendar data={calendar} />
        <Contributions year={year} login={login} />
      </div>
    </div>
  );
}

export default App;
