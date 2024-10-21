import { getAuth } from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import { Score } from "~/game/scoreboard";

export async function getScoreBoard(): Promise<Array<Score>>{
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
    return scoresList;
}
export async function getUserData(){
    const auth = getAuth();
    if (auth.currentUser !== null){
        const userRef = auth.currentUser!.uid;
        const firestore = getFirestore();
        const db = collection(firestore,"users");
        const userDocRef = doc(db,userRef);
        const userDocRaw = await getDoc(userDocRef);
        const userData = userDocRaw.data();
        return userData;
    }
    else {
        return null;
    }
}
export async function updateHighestScore(currentScore: string){
    const auth = getAuth();
    const userRef = auth.currentUser!.uid;
    const firestore = getFirestore();
    const db = collection(firestore,"users");
    const userDocRef = doc(db,userRef);
    const userDocRaw = await getDoc(userDocRef);
    const userData = userDocRaw.data();
    if (userData!["highestScore"] > 0){
        updateDoc(userDocRef,{"highestScore": arrayUnion(currentScore)});
    }
}