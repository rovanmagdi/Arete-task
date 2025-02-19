// routing
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
// lazy loading for modules
const InfinteScroll = lazy(
  () => import("../modules/InfinteScroll/InfinteScroll")
);
const Pagination = lazy(() => import("../modules/Pagination/Pagination"));
const Analytics = lazy(() => import("../modules/Analytics/Analytics"));
const NotFound = lazy(() => import("./NotFound"));

const AppRouters = () => {
  // router config
  const routerConfig = [
    {
      path: "/",
      element: <InfinteScroll />,
    },
    {
      path: "/pagination",
      element: <Pagination />,
    },
    {
      path: "/infinite-scroll",
      element: <Analytics />,
    },
    {
      path: "/not-found",
      element: <NotFound />,
    },
  ];
  // router provider
  const router = createBrowserRouter(routerConfig);

  return <RouterProvider router={router} />;
};

export default AppRouters;
