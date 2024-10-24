import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc} from "firebase/firestore";
import { Score } from "~/game/scoreboard";

export async function login(email: string,password:string){
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth,email,password);
    alert("You have been logged in! You can continue playing, good luck!");
}
export async function register(name: string, email: string, password: string,currentScore: number){
    try {
        const auth = getAuth();
        const authResponse = await createUserWithEmailAndPassword(auth,email,password);
        const firestore = getFirestore();
        const db = collection(firestore,"users");
        const userRef = doc(db,authResponse.user.uid);
        const userData = {
            id: authResponse.user.uid,
            name: name,
            email: email,
            highestScore: currentScore
        }
        await setDoc(userRef,userData);
        alert("You have been registered! You can continue playing, good luck!");
    }
    catch (e: unknown){
        console.error("An error occured during registration: ",e);
        if (e instanceof Error) {
            alert(e.message || "An error occured during registration. Try again");
        } else {
            alert("An error occured during registration. Try again");
        }
    }
}