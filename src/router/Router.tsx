import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
</BrowserRouter>
);

export default Router;