export interface Score {
    name: string,
    highestScore: string,
}
export function Scoreboard(scoresList: Array<Score>){
    const scoreboard = (
        <table>
            <thead>
                <th> Rank </th>
                <th> Name </th>
                <th> Score </th>
            </thead>
            <tbody>
                {scoresList.map((row,index) => (
                    <tr key = {index}>
                        <td> {index + 1} </td>
                        <td> {row.name} </td>
                        <td> {row.highestScore} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}