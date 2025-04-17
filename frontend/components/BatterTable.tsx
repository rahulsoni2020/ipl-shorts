const BatterTable = ({data, selectedTeam}:any) => {

    return(
        <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full mx-auto border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 text-center py-4 bg-gray-50 rounded-t-xl border-b">{selectedTeam} - Batting Scorecard</h2>
        <table className="min-w-full text-sm text-gray-700 text-center">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
            <tr>
              <th className="py-3 px-4">Player</th>
              <th className="py-3 px-4">R</th>
              <th className="py-3 px-4">B</th>
              <th className="py-3 px-4">4s</th>
              <th className="py-3 px-4">6s</th>
              <th className="py-3 px-4">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.map((player:any, index:number) => (
              <tr key={index} className="hover:bg-blue-50 transition">
                <td className="py-3 px-4 flex items-center gap-2 text-left whitespace-nowrap">
                  <img src={player.playerImage} alt={player.playerName} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-semibold">{player.playerName}</span>
                </td>
                <td className="py-3 px-4">{player.runs}</td>
                <td className="py-3 px-4">{player.balls}</td>
                <td className="py-3 px-4">{player.fours}</td>
                <td className="py-3 px-4">{player.sixes}</td>
                <td className="py-3 px-4">{player.strikeRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default BatterTable;