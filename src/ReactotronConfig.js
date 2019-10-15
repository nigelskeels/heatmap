import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

// .configure({ host: '10.27.134.118:3000' }) // we can use plugins here -- more on this later
// Reactotron
const reactotron = Reactotron
.configure({name: 'appname', host:'localhost'}) // we can use plugins here -- more on this later
.use(reactotronRedux())
.connect() // let's connect!

export default reactotron