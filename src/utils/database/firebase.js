import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyBe5lkaReyGZ_hc0CVgA5kofRShsL4FAyc",
	authDomain: "crown-clothing-dcb9a.firebaseapp.com",
	projectId: "crown-clothing-dcb9a",
	storageBucket: "crown-clothing-dcb9a.appspot.com",
	messagingSenderId: "380034542997",
	appId: "1:380034542997:web:85941355f9693cdcea9a9c"
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
	prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (user, additionalInformation = {}) => {
	if (!user) return
	const userDocRef = doc(db, 'users', user.uid)

	const userSnapshot = await getDoc(userDocRef)

	// Если пользователя нет в базе - записываем в базу
	if (!userSnapshot.exists()) {
		const { displayName, email } = user
		const createdAt = new Date()
		try {
			await setDoc(
				userDocRef,
				{
					displayName,
					email,
					createdAt,
					...additionalInformation // Дополнительная информация
				}
			)
		} catch ({ message }) {
			console.error(`Не удалось записать пользователя в базу. Ошибка: ${ message }`)
		}
	}

	// Если пользователь есть в базе
	return userDocRef

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

/* @@observer model
* { next: callback,
* error: errorCallback,
* complete: completedCallback } */
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
