

import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./routes/routes";
const App = () => {
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location.pathname])
  const UsemainRoutes = () => {
    const mainRoutes = useRoutes(routes);
   
    return mainRoutes;
  };

  return (
    
    <UsemainRoutes />
          
  );
};

export default App;
