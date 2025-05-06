import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import EventList from './components/events/EventList';
import EventDetail from './components/events/EventDetail';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/user/Profile';

function App() {
  // Remove unused state
  // const [count, setCount] = useState(0);

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
                <Route path="/events/create" element={<CreateEvent />} />
                <Route path="/events/edit/:id" element={<EditEvent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
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
