import React from 'react';

type Player = {
  playerImage: string;
  playerName: string;
  overs: string;
  maidens: string;
  runsConceded: string;
  wickets: string;
  economy: string;
  dots: string;
};

type PlayerDetailsProps = {
  players: Player[];
};

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ players }) => {
  return (
    <div className="player-details">
      {players.map((player, index) => (
        <div key={index} className="player-card">
          <img src={player.playerImage} alt={player.playerName} className="player-image" />
          <h3>{player.playerName}</h3>
          <p>Overs: {player.overs}</p>
          <p>Maidens: {player.maidens}</p>
          <p>Runs Conceded: {player.runsConceded}</p>
          <p>Wickets: {player.wickets}</p>
          <p>Economy: {player.economy}</p>
          <p>Dots: {player.dots}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerDetails;