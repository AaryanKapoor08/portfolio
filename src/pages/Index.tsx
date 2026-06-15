import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import LlamaBelt from '@/components/home/LlamaBelt';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import Experience from '@/components/home/Experience';
import Contact from '@/components/home/Contact';
import PlayStage from '@/components/home/PlayStage';
import Reveal from '@/components/ui/Reveal';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ScrollProgress from '@/components/ui/ScrollProgress';
import KonamiRain from '@/components/ui/KonamiRain';
import IntroSplash from '@/components/ui/IntroSplash';

const Index = () => {
  return (
    <Layout>
      <IntroSplash />
      <ScrollProgress />
      <KonamiRain />
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      
      <Reveal>
        <Projects />
      </Reveal>

      <LlamaBelt />

      <Reveal>
        <About />
      </Reveal>

      <Reveal>
        <Skills />
      </Reveal>
      
      <Reveal>
        <Experience />
      </Reveal>

      <Reveal>
        <PlayStage />
      </Reveal>

      <Reveal>
        <Contact />
      </Reveal>

      <Footer />

      <ScrollToTop />
    </Layout>
  );
};

export default Index;
