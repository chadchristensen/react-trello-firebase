import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCRnZMo09xkSxSzUwwLgghqZNlxUB4lFng",
    authDomain: "react-trello-781e5.firebaseapp.com",
    databaseURL: "https://react-trello-781e5.firebaseio.com",
    projectId: "react-trello-781e5",
    storageBucket: "react-trello-781e5.appspot.com",
    messagingSenderId: "549275844659",
    appId: "1:549275844659:web:e4a3ec8e3c3031a06b6346",
    measurementId: "G-F8CX4ZJ9ED"
}

firebase.initializeApp(config);

const db = firebase.firestore()

const boardsRef = db.collection('boards');
const listsRef = db.collection('lists');
const cardsRef = db.collection('cards');

export {
    boardsRef,
    listsRef,
    cardsRef
}