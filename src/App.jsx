import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Ideas from "./pages/Ideas";
import Work from "./pages/Work";
import About from "./pages/About";
import Banner from "./components/Banner";
import Carrers from "./pages/Carrers"; 
import Contact from "./pages/Contact";

import PostList from "./components/PostList";

function App() {
  // Mock CMS data - replace with actual CMS data fetching
  const cmsData = {
    bannerImage: "/assets/banner.jpg",
    bannerTitle: "Ideas",
    bannerSubtitle: "Where all our great things begin"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          {/* Homepage with Banner */}
          <Route path="/" element={
            <>
              <Banner
                imageUrl={cmsData.bannerImage}
                title={cmsData.bannerTitle}
                subtitle={cmsData.bannerSubtitle}
                slantHeight="25%"
                overlayOpacity={0.7}
              />
              <LandingPage />
            </>
          } />
          
          {/* Ideas Page with Post List */}
          <Route path="/ideas" element={
            <div className="max mx-auto">
              <Banner
                imageUrl="/assets/ideas-banner.jpg"
                title="Our Ideas"
                subtitle="Exploring creative possibilities"
                slantHeight="20%"
                overlayOpacity={0.6}
              />
              <PostList />
            </div>
          } />
          
          {/* Other Pages */}
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/carrers" element={<Carrers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>


    </div>
  );
}

export default App;