import { MATCH_TYPE } from '@/constants/common.constants';
import Image from 'next/image';
import Link from 'next/link';

type Team = {
  name: string;
  logo: string;
};

type MatchProps = {
  matchNumber: string;
  venue: string;
  city: string;
  matchDate: string;
  matchTime: string;
  matchUrl: string;
  teams: [Team, Team];
};

export default function MatchCard({match, type} :any) {

   const { matchNumber, venue, city, matchDateTime, status, matchUrl, teams, isLive = false, id } = match;

   const isWinner = (idx:number)=>{
    return status?.includes(teams[idx].name) && MATCH_TYPE.PAST === type ? 'text-green-600' : '';
   }

  return (
    <Link href={(type === MATCH_TYPE.PAST || isLive) ? `match-results/${id}/${isLive ? 'live': 'past'}`: '#'} passHref>
<div className={`bg-white rounded-xl shadow-md overflow-hidden w-full max-w-screen-lg mx-auto hover:shadow-lg transition relative border border-gray-200 ${type === MATCH_TYPE.PAST || isLive ? 'cursor-pointer' : 'cursor-default'}`}>

{/* Match Number - Top Left Styled */}
<div className="absolute top-0 left-0 px-4 py-1 text-xs font-bold bg-gradient-to-r from-blue-400 to-yellow-300 text-black shadow-sm 
                border-t border-l border-gray-200 rounded-br-lg z-10">
  {matchNumber}
</div>

{/* Live Indicator - Top Right */}
{isLive && (
  <div className="absolute top-0 right-0 flex items-center gap-1 text-red-600 font-semibold px-3 py-1 text-xs z-10">
    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
    Live
  </div>
)}

{/* Status Banner - Center Top */}

<div className="flex flex-col md:flex-row p-4 pt-8 gap-4">
  {/* Left Section - Teams */}
  <div className="flex flex-row justify-around items-center w-full md:w-3/5">
    
    {/* Team 1 */}
    <div className="flex flex-col items-center w-[25%] min-w-[150px] h-[150px] pt-4 py-2">
      <div className="flex items-center justify-center h-[80px]">
        <img
          src={teams[0].logo}
          alt={teams[0].name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className={`font-semibold text-sm text-center flex items-center justify-center ${isWinner(0)}`}>
        {teams[0].name}
        {(status?.includes(teams[1].name) && MATCH_TYPE.PAST === type)&& (
          <span className="ml-1">🏁</span>
        )}
      </p>
      {teams[1].score && <div className="text-xs text-center pt-1 text-gray-600 leading-tight">
        <p className="font-semibold text-black">
          {teams[0].score || '-'} / {teams[0].wickets || '-'} {teams[0].overs}
        </p>
      </div>}
    </div>

    {/* VS */}
    <div className="w-[10%] text-center text-gray-500 font-bold text-lg flex items-center justify-center h-[150px]">
      <span className="hidden md:inline text-xl">VS</span>
      <span className="md:hidden text-base">vs</span>
    </div>

    {/* Team 2 */}
    <div className="flex flex-col items-center w-[25%] pt-4 min-w-[150px] h-[150px] py-2">
      <div className="flex items-center justify-center h-[80px]">
        <img
          src={teams[1].logo}
          alt={teams[1].name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className={`font-semibold text-sm text-center flex items-center justify-center ${isWinner(1)}`}>
        {teams[1].name}
        {(status?.includes(teams[1].name) && MATCH_TYPE.PAST === type) && (
          <span className="ml-1">🏁</span>
        )}
      </p>
      {teams[1].score && <div className="text-xs text-center pt-1 text-gray-600 leading-tight">
        <p className="font-semibold text-black">
          {teams[1].score || '-'} / {teams[1].wickets || '-'} {teams[1].overs}
        </p>
      </div>}
    </div>
  </div>

  {/* Right Section - Match Info */}
  <div className="flex flex-col justify-center md:items-end w-full md:w-2/5 text-center md:text-right text-sm text-gray-600">
    <p className="font-bold text-gray-800">{matchDateTime}</p>
    <p>{venue}</p>
    <p>{city}</p>
  </div>
</div>
{status && (
  <div className=" bg-blue-100 text-blue-700 font-semibold rounded-bl-lg rounded-br-lg px-4 py-1 text-xs shadow-md z-10 text-center max-w-full whitespace-nowrap truncate">
    {status}
  </div>
)}
</div>
</Link>
  );
}
