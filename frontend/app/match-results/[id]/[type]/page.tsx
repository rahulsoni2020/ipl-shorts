"use client";

import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useParams } from "next/navigation";
import BatterTable from "@/components/BatterTable";
import BowlerTable from "@/components/BowlerTable";
import TeamPlayers from "@/components/TeamPlayers";
import Error from "@/components/Error";


interface Team {
  logo: string;
  name: string;
  code: string;
  score: string;
  overs: string;
  winner: boolean;
}

interface MatchDetails {
  matchNumber: string;
  venue: string;
  city: string;
  matchDate: string;
  matchTime: string;
  matchDateTime: string;
  status: string;
  matchUrl: string;
  id: string;
  teams: Team[];
}

interface Player {
  playerImage: string;
  playerName: string;
  runs?: string;
  balls?: string;
  fours?: string;
  sixes?: string;
  strikeRate?: string;
  overs?: string;
  maidens?: string;
  runsConceded?: string;
  wickets?: string;
  economy?: string;
  dots?: string;
}

export default function MatchResults() {
  const params = useParams();
  const { id, type } = params;
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('batter');

  const { data: matchDetails, loading: matchLoading, error: matchError, fetchData: fetchMatchDetails } = useFetchData<MatchDetails>({
    url: `/match/${id}/${type}/details`,
    method: "get",
    autoFetch: !!id,
  });

  const { data: matchData, loading: scoreLoading, error: scoreError, fetchData: fetchScoreCard } = useFetchData<{data:{ batter: Player[]; bowler: Player[]; teamPlayers:[]} }>({
    url: `/match/${id}/${activeTab}/${matchDetails?.teams?.[0]?.code}/results`,
    method: "get",
    autoFetch: false,
  });



  useEffect(() => {
    if (id) {
      fetchMatchDetails();
    }
  }, [id]);

  useEffect(() => {
    if(matchDetails?.teams?.[0]?.code){
    setSelectedTeam(matchDetails?.teams?.[0]?.code || null);
    fetchScoreCard();
    }
  }, [matchDetails]);

  useEffect(()=>{
    if(activeTab && selectedTeam){
      fetchScoreCard();
    }
  },[selectedTeam, activeTab])



  if (matchLoading) {
    return   <div className="fixed inset-0 bg-white-200 flex items-center justify-center z-50">
    <div className="w-12 h-12 bg-blue-500 rounded-full animate-bounce shadow-lg" />
  </div>;
  }

  if (matchError) {
    return <Error/>;
  }

  if (!matchDetails) {
    return <div className="text-center py-10">No match details available.</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="bg-white shadow-lg mb-4 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 rounded-t-xl bg-blue-50">
          {/* Left Team */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <img
              src={matchDetails.teams[0].logo}
              alt={matchDetails.teams[0].name}
              className="w-20 h-20 object-contain"
            />
            <div className="text-center">
              <h2 className={`text-lg font-semibold ${matchDetails.teams[0].winner ? "text-blue-600" : "text-gray-800"}`}>
                {matchDetails.teams[0].name}
              </h2>
              <p className={`text-sm ${matchDetails.teams[0].winner? "text-blue-500 font-bold" : "text-gray-600"}`}>
                {matchDetails.teams[0].score}
              </p>
              {matchDetails.teams[0].winner && (
                <span className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Winner
                </span>
              )}
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center gap-2 w-1/2 text-center">
            <h1 className="text-2xl font-bold text-gray-800">{matchDetails.matchNumber}</h1>
            <p className="text-sm text-gray-500">{matchDetails.venue}, {matchDetails.city}</p>
            <p className="text-sm text-gray-500">{matchDetails.matchDateTime}</p>
            <p className={`text-sm font-medium ${matchDetails.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
              {matchDetails.status}
            </p>

            {/* Team Selector Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {matchDetails.teams.map((team) => (
                <button
                  key={team.code}
                  onClick={() => setSelectedTeam(team.code)}
                  className={`px-4 py-2 rounded-full text-sm transition duration-200 shadow-sm 
                    ${selectedTeam === team.code
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"}
                  `}
                >
                  {team.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Team */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <img
              src={matchDetails.teams[1].logo}
              alt={matchDetails.teams[1].name}
              className="w-20 h-20 object-contain"
            />
            <div className="text-center">
              <h2 className={`text-lg font-semibold ${ matchDetails.teams[1].winner ? "text-blue-600" : "text-gray-800"}`}>
                {matchDetails.teams[1].name}
              </h2>
              <p className={`text-sm ${ matchDetails.teams[1].winner ? "text-blue-500 font-bold" : "text-gray-600"}`}>
                {matchDetails.teams[1].score}
              </p>
              
              { matchDetails.teams[1].winner && (
                <span className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Winner
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
        <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="flex justify-start gap-2 mb-6 overflow-x-auto border-b border-gray-300">
      {['batter', 'bowler', 'teamPlayers'].map((tab) => (
        <button
          key={tab}
          className={`px-5 py-2 text-sm font-semibold transition duration-300 rounded-t-md focus:outline-none whitespace-nowrap
            ${activeTab === tab ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-blue-100"}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
        
        {matchData?.data && scoreLoading && (
          <>
            {activeTab === 'batter' && (
              <BatterTable data={matchData.data} selectedTeam={selectedTeam} />
            )}

            {activeTab === 'bowler' && (
              <BowlerTable data={matchData.data} selectedTeam={selectedTeam} />
            )}

            {activeTab === 'teamPlayers' && (
              <TeamPlayers data={matchData.data} selectedTeam={selectedTeam} />
            )}
          </>
        )}
          {
            scoreLoading && (
              <div className="inset-0 bg-white flex items-center justify-center z-50">
                <div className="w-12 h-12 bg-blue-500 rounded-full animate-bounce shadow-lg" />
              </div>
            )
          }

        </div>
    </div>
  );
}