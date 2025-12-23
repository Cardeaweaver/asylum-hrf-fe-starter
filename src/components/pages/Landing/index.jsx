import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
// 1. RE-ADD THE HOOK IMPORT
import { useDownloadData } from '../../../hooks/useDownloadData.js';

export const LandingPage = () => {
  const navigate = useNavigate();
  // 2. INITIALIZE THE DOWNLOAD FUNCTION
  const { downloadCSV } = useDownloadData();

  return (
    <div className="flex flex-col w-full font-serif text-[#404037]">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#404037] text-white py-20 px-4 text-center">
        <h1 className="text-6xl mb-6 font-normal">Asylum Office Grant Rate Tracker</h1>
        <h3 className="text-lg font-light max-w-4xl mx-auto leading-relaxed">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions.
        </h3>
      </section>

      {/* 2. GRAPHS PREVIEW SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-around items-end gap-12 mb-12">
          <div className="flex flex-col items-center">
            <img src={barGraph} alt="Bar Graph" className="h-56 mb-6 object-contain" />
            <h2 className="text-xl font-bold">Search Grant Rates By Office</h2>
          </div>
          <div className="flex flex-col items-center">
            <img src={pieChart} alt="Pie Chart" className="h-56 mb-6 object-contain" />
            <h2 className="text-xl font-bold">Search Grant Rates By Nationality</h2>
          </div>
          <div className="flex flex-col items-center">
            <img src={lineGraph} alt="Line Graph" className="h-44 mb-6 object-contain" />
            <h2 className="text-xl font-bold">Search Grant Rates Over Time</h2>
          </div>
        </div>

        {/* 3. BUTTONS WITH ONCLICK HANDLERS ADDED BACK */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/graphs')} 
            className="bg-[#666666] text-white px-6 py-2 text-sm hover:bg-black transition-all duration-300 hover:scale-105"
          >
            View the Data
          </button>
          <button 
            onClick={() => downloadCSV()} 
            className="bg-[#666666] text-white px-6 py-2 text-sm hover:bg-black transition-all duration-300 hover:scale-105"
          >
            Download the Data
          </button>
        </div>
      </section>

      {/* 4. MISSION SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-center py-20 px-10 gap-20 max-w-7xl mx-auto bg-white">
        <img src={paperStack} alt="Files" className="rounded-3xl shadow-2xl w-full md:w-1/2 h-[450px] object-cover" />
        <div className="md:w-1/2 text-xl text-gray-700 leading-relaxed font-light text-left">
          <p>Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021 by the USCIS Asylum Office...</p>
        </div>
      </section>

      {/* 5. SYSTEMIC DISPARITY INSIGHTS */}
      <section className="py-32 bg-white text-center pb-40">
        <h2 className="text-5xl mb-24 font-normal">Systemic Disparity Insights</h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 px-10 mb-20">
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-6xl font-bold mb-8">36%</h3>
            <p className="text-sm px-6">By the end of the Trump administration, the average asylum office grant rate had fallen 36%...</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-6xl font-bold mb-8">5%</h3>
            <p className="text-sm px-6">The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-6xl font-bold mb-8">6x Lower</h3>
            <p className="text-sm px-6">The New York office's average grant rate was 6 times lower than San Francisco.</p>
          </div>
        </div>
        <button className="bg-[#666666] text-white px-10 py-2 text-sm hover:bg-black mb-16 transition-all duration-300 hover:scale-105">
          Read More
        </button>
        <div>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            Back To Top ^
          </button>
        </div>
      </section>
    </div>
  );
};