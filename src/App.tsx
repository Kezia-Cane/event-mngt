import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/LoginForm';
import Register from './components/auth/RegisterForm';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';
import EventDetail from './components/events/EventDetail';
import EventList from './components/events/EventList';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

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
