import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home';
import Kanjis from '@pages/Kanjis';
import Header from '@components/Header';
import Lesson from '@pages/Lesson'

const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<Home />} />
      <Route path="/kanjis/jlpt/:kanji" element={<Kanjis />} />
      <Route path="/kanjis/jlpt/:kanji/lesson/:lesson" element={<Lesson />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
</BrowserRouter>
);

export default Router;