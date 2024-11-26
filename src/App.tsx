import './App.css'
import AppLayout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CreateNews from './components/CreateNews'
import UpdateNews from './components/UpdateNews'
import NewsList from './components/NewsList'
import NewsCard from './components/NewsCard'
import Login from './components/Login'
import Registr from './components/Register'
import { ProtectedRoute } from './security/ProtectedRoute'
import NewsInfo from './components/NewsInfo'
import NewsCardByCategory from './components/NewsCardByCategory'
function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home/>} />
        <Route path='/news-card' element={<NewsCard />} />
        <Route path="/news" element={<NewsList />} />
        <Route path='/news/:id' element={<NewsInfo />} />
        <Route path="/news/create" element={<ProtectedRoute><CreateNews /></ProtectedRoute>} />
        <Route path="/news/edit/:id" element={<UpdateNews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registr />} />
        <Route path="/news/category/:categoryId" element={<NewsCardByCategory />} />
        <Route path='*' element={<p>Page Not Found!</p>} />
      </Route>
    </Routes>
  )
}

export default App