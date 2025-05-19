import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home';
import N5 from '@pages/N5';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/kanji/N5" element={<N5 />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
</BrowserRouter>
);

export default Router;