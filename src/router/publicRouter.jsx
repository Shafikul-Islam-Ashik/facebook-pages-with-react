import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";

// create private router
const publicRouter = [
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

// export
export default publicRouter;
