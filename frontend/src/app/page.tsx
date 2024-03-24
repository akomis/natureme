import About from './sections/About';
import Footer from './sections/Footer';
import Header from './sections/Header';
import Testimonials from './sections/Testimonials';

export default async function Index() {
  return (
    <div className="font-serif scroller">
      <Header />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
}
