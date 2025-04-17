// app/page.tsx (Server Component)
import MatchCard from "@/components/MatchCard";
import { MATCH_TYPE } from "@/constants/common.constants";
import ROUTES from "@/constants/route.constants";
import { axiosInstance } from "@/libs/axios";

type Props = {
  initialMatches: any[];
};

const Home = async () => {
  try {
    const res = await axiosInstance.get(ROUTES.PAST_MATCHES);
    const initialMatches = res?.data?.data;

    return (
      <div className="flex gap-4 justify-center align-middle pt-4 flex-col">
        <div>Past Matches</div>
        {initialMatches.length === 0 ? (
          <p>No upcoming matches found.</p>
        ) : (
          initialMatches.map((match:any, index:number) => (
            <MatchCard key={match?.matchNumber} match={match} type={MATCH_TYPE.PAST} />
          ))
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="flex justify-center align-middle pt-4 flex-col">
        <p>Error fetching matches</p>
      </div>
    );
  }
};

export default Home;
