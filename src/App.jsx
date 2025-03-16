import { 
  createBrowserRouter, 
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

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
        { index: true, element: <Home /> },
        { path: "post/:slug", element: <BlogPost /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
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
