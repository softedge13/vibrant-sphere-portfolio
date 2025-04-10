
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroScene from '@/components/HeroScene';
import SectionHeading from '@/components/SectionHeading';
import AnimatedCard from '@/components/AnimatedCard';
import ContactForm from '@/components/ContactForm';
import TypingText from '@/components/TypingText';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

// Sample data
const certificates = [
  {
    title: "Web Development Mastery",
    description: "Comprehensive certification covering all aspects of modern web development including HTML5, CSS3, JavaScript, React and Node.js.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "UI/UX Design Certificate",
    description: "Professional certification in user interface and experience design principles, including wireframing, prototyping, and user research.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1471&auto=format&fit=crop"
  },
  {
    title: "Advanced 3D Graphics",
    description: "Specialized training in 3D modeling, animation, and implementation of 3D graphics in web applications using Three.js and WebGL.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Cloud Computing Certification",
    description: "Professional certification in cloud architecture, deployment, and management across major cloud platforms.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1470&auto=format&fit=crop"
  }
];

const achievements = [
  {
    title: "Best Portfolio Design",
    description: "Recognized for outstanding portfolio design at the Annual Web Design Awards 2023, featuring innovative 3D elements and interaction.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop"
  },
  {
    title: "First Place Hackathon",
    description: "Led a team to first place in the Global Code Challenge, developing an AI-assisted accessibility tool for visually impaired users.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop"
  },
  {
    title: "Open Source Contributor",
    description: "Recognized as a top contributor to several major open source projects, with over 500 accepted pull requests across various repositories.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Publications",
    description: "Published author of 'Modern Web Animation Techniques' and 'Building Immersive 3D Experiences for the Web'.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1373&auto=format&fit=crop"
  }
];

const skills = [
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Three.js", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "UI/UX Design", level: 85 },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-medium">{level}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <HeroScene />
        <div className="container mx-auto px-4 z-10 pt-24 flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0"
          >
            <div className="inline-block text-sm px-4 py-2 bg-primary/10 rounded-full text-primary mb-6">
              Welcome to my Portfolio
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block">Hi, I'm</span>
              <span className="text-gradient">
                <TypingText 
                  text="Creative 3D Developer" 
                  typingSpeed={100} 
                  className="inline-block animate-text-gradient"
                />
              </span>
            </h1>
            
            <div className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 mb-10">
              <TypingText 
                text="Building immersive web experiences with cutting-edge technology and creative design." 
                typingSpeed={30} 
                startDelay={2400}
              />
            </div>
            
            <motion.div
              initial={{ opacity: -0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#about"
                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <span>Learn More</span>
                <ArrowDown className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* 3D floating shape on the right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full lg:w-1/2 h-[300px] lg:h-[500px] relative perspective preserve-3d"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-6 animate-float opacity-70"></div>
            <div className="absolute inset-0 w-full h-full glass rounded-3xl transform -rotate-3 animate-float opacity-80" style={{animationDelay: "1s"}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                {/* We'll have a 3D canvas here but it's already in HeroScene */}
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 opacity-50" />
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="About Me" 
            subtitle="With over 5 years of experience in web development, I specialize in creating immersive experiences using modern technologies and 3D graphics."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <p className="text-foreground/80">
                Hello! I'm a passionate web developer and designer with expertise in creating interactive web applications. I combine technical skills with creative design to build engaging user experiences.
              </p>
              <p className="text-foreground/80">
                My journey in web development started 5 years ago, and since then, I've worked on numerous projects ranging from small business websites to complex web applications with 3D elements and animations.
              </p>
              <p className="text-foreground/80">
                I'm constantly learning and exploring new technologies to stay at the forefront of web development trends. When I'm not coding, you can find me exploring nature, reading, or experimenting with new design concepts.
              </p>
              
              <div className="flex gap-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2"
                >
                  <span>Contact Me</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="px-6 py-2 border border-border rounded-lg font-medium flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Resume</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <h3 className="text-xl font-bold mb-4">My Skills</h3>
              
              {skills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Certificates Section */}
      <section id="certificates" className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Certificates" 
            subtitle="Professional certifications and educational achievements that showcase my expertise and commitment to ongoing learning."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <AnimatedCard 
                key={index}
                title={cert.title}
                description={cert.description}
                image={cert.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section id="achievements" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Achievements" 
            subtitle="Notable recognition and accomplishments throughout my professional journey in web development and design."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <AnimatedCard 
                key={index}
                title={achievement.title}
                description={achievement.description}
                image={achievement.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Contact Me" 
            subtitle="Have a project in mind or want to collaborate? Get in touch and let's create something amazing together."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold">Get In Touch</h3>
              <p className="text-foreground/80">
                Feel free to reach out if you have any questions, want to discuss a potential project, or just want to say hello. I'm always open to new opportunities and collaborations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:hello@example.com" className="text-foreground/80 hover:text-primary transition-colors">
                      hello@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a href="tel:+11234567890" className="text-foreground/80 hover:text-primary transition-colors">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-foreground/80">
                      San Francisco, California
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
