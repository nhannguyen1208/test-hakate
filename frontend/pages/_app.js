import Navbar from "../components/Navbar"; // đảm bảo đường dẫn đúng
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />

    </>
  );
}
