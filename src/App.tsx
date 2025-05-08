import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/LoginForm';
import PrivateRoute from './components/auth/ProtectedRoute';
import Register from './components/auth/RegisterForm';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';
import EventDetail from './components/events/EventDetail';
import EventList from './components/events/EventList';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Profile from './components/user/Profile';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/events/create" element={
                  <PrivateRoute>
                    <CreateEvent />
                  </PrivateRoute>
                } />
                <Route path="/events/edit/:id" element={
                  <PrivateRoute>
                    <EditEvent />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
