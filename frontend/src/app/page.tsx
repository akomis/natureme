import About from "./_sections/About";
import Footer from "./_sections/Footer";
import Header from "./_sections/Header";
import Testimonials from "./_sections/Testimonials";

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
