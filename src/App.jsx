import { 
  createBrowserRouter, 
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import ReportThreat from './pages/ReportThreat';
import PhotoGallery from './pages/news/PhotoGallery';
import VideoGallery from './pages/news/VideoGallery';
import News from './pages/news/News';
import Contact from './pages/Contact';
import Links from './pages/Links';
import StandardActs from './pages/info/StandardActs';
import InternationalCooperation from './pages/info/InternationalCooperation';
import Reports from './pages/info/Reports';
import Information from './pages/about/Information';
import HeadDeputies from './pages/about/HeadDeputies';
// Import Security pages
import Terrorism from './pages/security/Terrorism';
import OccupiedTerritories from './pages/security/OccupiedTerritories';
import Corruption from './pages/security/Corruption';
import CBRN from './pages/security/CBRN';

// Auth components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Admin components
import Dashboard from './pages/admin/Dashboard';
import PostEditor from './pages/admin/PostEditor';
import Unauthorized from './pages/Unauthorized';

// Layout component that includes the header and footer
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Create router with future flags to address the warnings
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "home", element: <Home /> },
        { path: "post/:slug", element: <BlogPost /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "report-threat", element: <ReportThreat /> },
        { path: "news", element: <News /> },
        { path: "news/photo-gallery", element: <PhotoGallery /> },
        { path: "news/video-gallery", element: <VideoGallery /> },
        { path: "contact", element: <Contact /> },
        { path: "links", element: <Links /> },
        { path: "info/standard-acts", element: <StandardActs /> },
        { path: "info/international-cooperation", element: <InternationalCooperation /> },
        { path: "info/reports", element: <Reports /> },
        { path: "about/information", element: <Information /> },
        { path: "about/head-deputies", element: <HeadDeputies /> },
        // Add the new route for the Terrorism page
        { path: "security/terrorism", element: <Terrorism /> },
        { path: "security/occupied-territories", element: <OccupiedTerritories /> },
        { path: "security/corruption", element: <Corruption /> },
        { path: "security/cbrn", element: <CBRN /> },
        { 
          path: "admin",
          element: <ProtectedRoute requireAdmin={true}><Dashboard /></ProtectedRoute>
        },
        {
          path: "admin/posts/new",
          element: <ProtectedRoute requireAdmin={true}><PostEditor /></ProtectedRoute>
        },
        {
          path: "admin/posts/edit/:postId",
          element: <ProtectedRoute requireAdmin={true}><PostEditor /></ProtectedRoute>
        },
        { path: "unauthorized", element: <Unauthorized /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_prependBasename: true
    }
  }
);

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider 
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_normalizeFormMethod: true,
            v7_prependBasename: true
          }}
        />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
