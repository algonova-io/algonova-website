import {createApp} from 'vue'
import App from './App.vue'
import './style.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faArrowUp, faCircleChevronDown} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowUp,faCircleChevronDown)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
