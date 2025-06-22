'use client';

import { useEffect, useState } from 'react';

const subjects = [
  "Software Engineering",
  "Mathematics",
  "Robotics",
  "Economics",
  "Artificial Intelligence",
  "Quantum Physics",
  "Oragnic Chemistry",
  "Marketing",
  "Business Ethics",
  "Psychology"
];

type VoteMap = { [key: string]: number };

export default function Home() {
  const [votes, setVotes] = useState<VoteMap>({});
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const storedVotes = localStorage.getItem('votes');
    const parsedVotes = storedVotes ? JSON.parse(storedVotes) : {};
    const storedCounts = localStorage.getItem('voteCounts');
    const parsedCounts = storedCounts ? JSON.parse(storedCounts) : {};
    setVotes(parsedCounts);
    setTotalVotes(Object.values(parsedCounts as Record<string, number>).reduce((a, b) => a + b, 0));
  }, []);

  const handleVote = (subject: string) => {
    const voted = localStorage.getItem('voted-' + subject);
    if (voted) return alert("You already voted for this subject!");

    const newVotes = { ...votes, [subject]: (votes[subject] || 0) + 1 };
    setVotes(newVotes);
    localStorage.setItem('voteCounts', JSON.stringify(newVotes));
    localStorage.setItem('voted-' + subject, 'yes');
    setTotalVotes(totalVotes + 1);
  };

  const sortedSubjects = [...subjects].sort(
    (a, b) => (votes[b] || 0) - (votes[a] || 0)
  );

  const topSubject = sortedSubjects[0];
  const getColor = (rank: number) =>
    ['bg-yellow-400', 'bg-gray-300', 'bg-orange-400'][rank] || 'bg-purple-300';

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🏆 Leaderboard</h1>
      <div className="flex justify-center mb-8">
        <div className={`card w-64 h-44 bg-yellow-400`}>
          <div className="text-2xl font-semibold">🥇 Coolest Subject</div>
          <div className="mt-3 font-bold text-xl">{topSubject}</div>
          <div className="text-sm text-blue-800 mt-1">
          {Math.round(((votes[topSubject] || 0) / totalVotes) * 100) || 0}% votes
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">📊 Subjects Vote Meter</h2>
      <div className="bg-purple-800 rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white">
              <th className="p-2">#</th>
              <th>Subject</th>
              <th>Vote</th>
              <th>Coolness</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubjects.map((subject, idx) => {
              const percent = totalVotes ? Math.round((votes[subject] || 0) / totalVotes * 100) : 0;
              return (
                <tr key={subject} className="border-t border-purple-700">
                  <td className="p-2">{idx + 1}</td>
                  <td>{subject}</td>
                  <td>
                    <button
                      onClick={() => handleVote(subject)}
                      className="bg-pink-400 hover:bg-pink-500 px-4 py-1 rounded-full text-white text-xs"
                    >
                      Vote
                    </button>
                  </td>
                  <td className="w-1/2">
                    <div className="bg-purple-200 h-4 rounded-full overflow-hidden">
                      <div
                        className="bg-pink-400 h-full text-xs text-right pr-1"
                        style={{ width: `${percent}%` }}
                      >
                        {percent > 0 ? `${percent}%` : ''}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
