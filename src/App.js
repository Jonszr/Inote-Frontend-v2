

import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

const App = () => {
  const UsemainRoutes = () => {
    const mainRoutes = useRoutes(routes);
    return mainRoutes;
  };
  return (
    
    <UsemainRoutes />
          
  );
};

export default App;
