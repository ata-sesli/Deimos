export interface Score {
    name: string,
    highestScore: string,
}
export function Scoreboard(scoresList: Array<Score>){
    const scoreboard = (
        <div className="overflow-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <th className="px-6 py-3 text-left text-lg font-medium text-white tracking-wider"> Rank </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-white tracking-wider"> Name </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-white tracking-wider"> Score </th>
                </thead>
                <tbody>
                    {scoresList.map((row,index) => (
                        <tr key = {index}>
                            <td className="px-6 py-4 whitespace-nowrap"> {index + 1} </td>
                            <td className="px-6 py-4 whitespace-nowrap"> {row.name} </td>
                            <td className="px-6 py-4 whitespace-nowrap"> {row.highestScore} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    return scoreboard;
}