import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home';
import Kanjis from '@pages/Kanjis';
import Lesson from '@pages/Lesson'
import Practice from '@pages/Practice';
import Kana from '@pages/Kana';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/kanjis/jlpt/:kanji" element={<Kanjis />} />
      <Route path="/kanjis/jlpt/:kanji/lesson/:lesson" element={<Lesson />} />
      <Route path="/kanjis/jlpt/:kanji/practice" element={<Practice />} />
      <Route path="/kana/:kana" element={<Kana />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
</BrowserRouter>
);

export default Router;