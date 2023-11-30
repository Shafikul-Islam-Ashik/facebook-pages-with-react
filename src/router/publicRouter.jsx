import Auth from "../pages/auth/Auth";

// create private router
const publicRouter = [
  {
    path: "/",
    element: <Auth />,
  },
];

// export
export default publicRouter;
