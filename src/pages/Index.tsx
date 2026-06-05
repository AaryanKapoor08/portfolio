import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import Experience from '@/components/home/Experience';
import Contact from '@/components/home/Contact';
import Reveal from '@/components/ui/Reveal';
import ScrollToTop from '@/components/ui/ScrollToTop';

const Index = () => {
  return (
    <Layout>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      
      <Reveal>
        <Projects />
      </Reveal>

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
        <Contact />
      </Reveal>

      <ScrollToTop />
    </Layout>
  );
};

export default Index;
