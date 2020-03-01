import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/leaderboard/list/0", {
        responseType: "json"
      });
      setLeaderboardData(Object.entries(result.data));
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>Test Leaderboard</p>
        {leaderboardData && (
          <ul>
            {leaderboardData.map(team => (
              <li key={team[0]}>{team[1].Name}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default App;
