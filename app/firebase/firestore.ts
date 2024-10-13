import { getAuth } from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore";

export async function getScoreBoard(){
    const firestore = getFirestore();
    const db = collection(firestore,"users");
    const scoresSnapshot = await getDocs(db);
    const scoresList = scoresSnapshot.docs.map(doc => doc.data());
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