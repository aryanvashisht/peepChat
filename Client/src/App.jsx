import { useContext } from 'react'
import Left from './Home/Left/Left'
import Right from './Home/Right/Right'
import Logout from './Home/Left0/Logout'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import { Navigate, Route, Routes } from 'react-router'
import { AuthContext } from './context/authcontext'

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path='/' element={
          user ? <div className='flex h-screen'>
            <Logout />
            <Left />
            <Right />
          </div> : < Navigate to="/login" replace={true} />
        } />
        <Route path='/login' element={
          user ? < Navigate to="/" replace={true} /> : <div className='flex h-screen'><Login /></div>
        } />
        <Route path='/signup' element={
          <div className='flex h-screen'><SignUp /></div>
        } />
        {/* <SignUp/> */}
      </Routes>
    </>
  )
}

export default App
