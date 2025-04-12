import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

const waitlistRef = collection(db, "waitlist");

export const submitToWaitList = async (formData: {
    name: string;
    email: string;
    profession: string;
}) => {
    try {
        const q = query(waitlistRef, where("email", "==", formData.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            throw new Error("Email already on waitlist");
        }
    } catch (error) {
        throw new Error("Failed to submit to waitlist");    
    };

    await addDoc(waitlistRef, {
        ...formData,
        submittedAt: new Date(),
    });

    return { success: true, message: "Submitted to waitlist" };
}
