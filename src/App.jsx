import './App.css'
import Hero from './pages/hero/Hero'
import Comments from './pages/comments/Comments'
import Information from './pages/informations/Information'
import List from './pages/list/List'
import Date from './pages/date/Date'
import Maps from './pages/maps/Maps'


function App() {

  return (
    <div>
      <Hero/>
      <Information/>
      <List/>
      <Date/>
      <Maps/>
      <Comments/>
    </div>
  )
}

export default App
