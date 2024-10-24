export interface Score {
    name: string,
    highestScore: string,
}
interface ScoreboardProps {
    isOpen: boolean;
    onClose: () => void;
    scoresList: Array<Score>;
}
export function Scoreboard({isOpen, onClose, scoresList} : ScoreboardProps){
    if (!isOpen) return null;
    const scoreboard = (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-0 backdrop-blur-sm"></div>
            <div className="bg-white rounded-lg shadow-lg p-8 z-10 max-w-3xl w-full">
                <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>
                <div className="overflow-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-customBlue">
                            <tr>
                                <th className="px-6 py-3 text-left text-lg font-medium text-white tracking-wider">Rank</th>
                                <th className="px-6 py-3 text-left text-lg font-medium text-white tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-lg font-medium text-white tracking-wider">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoresList.map((row, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.highestScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
    console.log("Scoreboard is rendered!");
    return scoreboard;
}