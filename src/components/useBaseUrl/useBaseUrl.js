import { useLocation, useParams } from "react-router-dom";

export const useBasePath = () => {
  const location = useLocation();
  const params = useParams();
  var pathname = location.pathname;
  if (pathname[pathname.length - 1] === "/")
    pathname = pathname.substring(0, pathname.length - 1);
  return Object.values(params).reduce(
    (path, param) => path.replace("/" + param, ""),
    pathname
  );
};
