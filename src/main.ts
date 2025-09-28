import {createApp} from 'vue'
import App from './App.vue'
import './style.scss'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faArrowUp, faCircleChevronDown} from "@fortawesome/free-solid-svg-icons";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import index from "./router";

library.add(faArrowUp,faCircleChevronDown)
const firebaseConfig = {
    authDomain: "algonova-2837d.firebaseapp.com",
    projectId: "algonova-2837d",
    storageBucket: "algonova-2837d.firebasestorage.app",
    messagingSenderId: "386684462943",
    appId: "1:386684462943:web:de3429bf4dbc3f8017f8ea",
    measurementId: "G-K0TW15BJHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(index)
    .mount('#app')
