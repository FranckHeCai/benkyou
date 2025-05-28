import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home';
import Kanjis from '@pages/Kanjis';
import Lesson from '@pages/Lesson'
import Practice from '@pages/Practice';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/kanjis/jlpt/:kanji" element={<Kanjis />} />
      <Route path="/kanjis/jlpt/:kanji/lesson/:lesson" element={<Lesson />} />
      <Route path="/kanjis/jlpt/:kanji/practice/:lesson" element={<Practice />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
</BrowserRouter>
);

export default Router;