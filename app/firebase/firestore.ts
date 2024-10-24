import { getAuth } from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import { Score } from "~/game/scoreboard";

export async function getScoreBoard(): Promise<Array<Score> | null>{
    try {
        const firestore = getFirestore();
        const db = collection(firestore,"users");
        const usersSnapshot = await getDocs(db);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        const scoresList: Array<Score> = usersList.map((user): Score => {
            return {
                name: user["name"],
                highestScore: user["highestScore"]
            };
        }).sort((a,b) => parseInt(b.highestScore) - parseInt(a.highestScore)).slice(0,99);
        console.log("Scoreboard is refreshed!");
        return scoresList;
    }
    catch(e: unknown){
        if (e instanceof Error){
            console.error(e.message);
        }
    }
    return null;
}
export async function getUserData(uid: string){
        const userRef = uid;
        const firestore = getFirestore();
        const db = collection(firestore,"users");
        const userDocRef = doc(db,userRef);
        const userDocRaw = await getDoc(userDocRef);
        const userData = userDocRaw.data();
        return userData;
}
export async function updateHighestScore(currentScore: number,uid: string){
    try {
        const firestore = getFirestore();
        const db = collection(firestore,"users");
        const userDocRef = doc(db,uid);
        const userDocRaw = await getDoc(userDocRef);
        const userData = userDocRaw.data();
        if (userData!.highestScore < currentScore){
            await updateDoc(userDocRef,{highestScore: currentScore});
        }
        else {
            console.log("We failed boss!");
        }
        console.log(`Current score is: ${currentScore}`);
    }
    catch(e: unknown){
        if (e instanceof Error)
        console.error(e.message);
    }
}