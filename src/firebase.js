// firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseCofig = {
        apiKey: "AIzaSyDknKXHd_xkpIgpget3g_McLdsA1iTmlC8",
        authDomain: "sparta-react-5e33d.firebaseapp.com",
        projectId: "sparta-react-5e33d",
        storageBucket: "sparta-react-5e33d.appspot.com",
        messagingSenderId: "1030648892424",
        appId: "1:1030648892424:web:15d38766212ee5edcfd5bd",
        measurementId: "G-2SB1PQSZTE"
};

firebase.initializeApp(firebaseCofig);
// firebaseConfig 정보로 firebase 시작

const firestore = firebase.firestore();
// firebase의 firestore 인스턴스를 변수에 저장

export { firestore };
// 필요한 곳에서 사용할 수 있도록 내보내기