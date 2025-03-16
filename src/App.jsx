import { 
  createBrowserRouter, 
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

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
  // Apply future flags directly to RouterProvider
  return (
    <RouterProvider 
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_prependBasename: true
      }}
    />
  );
}

export default App;
