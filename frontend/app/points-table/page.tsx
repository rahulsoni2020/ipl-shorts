"use client";
import ROUTES from "@/constants/route.constants";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";

interface Header {
  key: string;
  title: string;
}

interface TeamData {
  pos: string;
  team: {
    image: string;
    name: string;
  };
  played: string;
  won: string;
  lost: string;
  noResult: string;
  netRunRate: string;
  for: string;
  against: string;
  points: string;
  recentForm: { text: string }[];
}

interface PointsTableData {
  headers: Header[];
  data: TeamData[];
filters: string[];
}

export default function PointsTable() {
    const [selectedSeason, setSelectedSeason] = useState<string>("2025");
  const { data, loading, error, fetchData } = useFetchData<PointsTableData>({
    url: `${ROUTES.POINTS_TABLE}${selectedSeason}`,
    method: "get",
    autoFetch: true,
  });

  useEffect(() => {
    fetchData();
  }, [selectedSeason]);

  const getFormColor = (result: string): string =>
    result === "W" ? "text-green-600 border-green-600" : "text-red-500 border-red-500";

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Points Table ({selectedSeason})</h2>
        <select
          className="mt-2 md:mt-0 border border-gray-300 rounded-md px-3 py-1 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          {(data?.filters || ['2025'])?.map((season) => (
            <option key={season} value={season}>
              SEASON {season}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-xl shadow-md overflow-x-auto w-full mx-auto border border-gray-200">
        <table className="min-w-full text-sm text-gray-700 text-center">
          {/* Sticky Table Header */}
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b sticky top-0 z-10">
            <tr>
              {data?.headers?.map((header) => (
                <th key={header.key} className="py-3 px-4">
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {data?.data?.map((team, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-50 transition ${
                  index < 4 ? "bg-gradient-to-r from-yellow-50 to-white" : ""
                }`}
              >
                <td className="py-3 px-4 font-medium">{team.pos}</td>

                {/* Team Logo + Name */}
                <td className="py-3 px-4 flex items-center gap-2 text-left whitespace-nowrap">
                  <img
                    src={team.team.image}
                    alt={team.team.name}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-semibold">{team.team.name}</span>
                </td>

                {/* Stats */}
                <td className="py-3 px-2">{team.played}</td>
                <td className="py-3 px-2">{team.won}</td>
                <td className="py-3 px-2">{team.lost}</td>
                <td className="py-3 px-2">{team.noResult}</td>
                <td className="py-3 px-2">{team.netRunRate}</td>
                <td className="py-3 px-4">{team.for}</td>
                <td className="py-3 px-4">{team.against}</td>

                {/* Points Badge */}
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    {team.points}
                  </span>
                </td>

                {/* Recent Form */}
                <td className="py-3 px-4 flex justify-center gap-1">
                  {team.recentForm.map((result, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border tooltip relative group ${
                        result.text === "W"
                          ? "border-green-500 text-green-500 bg-green-50"
                          : "border-red-400 text-red-400 bg-red-50"
                      }`}
                    >
                      {result.text}
                      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                        {result.text === "W" ? "Win" : "Loss"}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
