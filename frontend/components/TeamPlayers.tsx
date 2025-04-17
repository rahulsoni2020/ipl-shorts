import PlayerDetails from "./PlayerDetails";

const TeamPlayers =({data, selectedTeam}:any) => {
 return (
    
    <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full mx-auto border border-gray-200">
    <h2 className="text-2xl font-bold text-blue-700 text-center py-4 bg-gray-50 rounded-t-xl border-b">{selectedTeam} - Teams Overview</h2>
    <div className="p-4">
      {data?.map((player:any, index:number) => (
        <PlayerDetails key={index} players={player} />
      ))}
    </div>
  </div>
 )
};

export default TeamPlayers;