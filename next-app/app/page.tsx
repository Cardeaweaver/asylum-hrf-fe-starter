"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDownloadData } from "../src/hooks/useDownloadData";
import { ProvideAppContext, useAppContext } from "../src/context/AppContext.jsx";
import Footer from "../src/components/layout/Footer.jsx";

function LandingPageContent() {
  const router = useRouter();
  const { downloadCSV } = useDownloadData();
  const { isDataLoading, graphData } = useAppContext();

  

  return (
    <>
    <div className="flex flex-col w-full font-serif text-[#1e3a8a] bg-blue-100">
      {/* 1. HERO SECTION */}
      <section className="bg-[#1e3a8a] text-white py-20 px-4 text-center">
        <h1 className="text-6xl mb-6 font-normal">Asylum Office Grant Rate Tracker</h1>
        <h3 className="text-lg font-light max-w-4xl mx-auto leading-relaxed">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions.
        </h3>
      </section>

      {/* 2. GRAPHS PREVIEW SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-around items-end gap-12 mb-12">
          <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <Image 
              src={'/bar-graph.png'} 
              alt="Bar Graph" 
              className="h-56 w-auto mb-6 object-contain shadow-2xl rounded-lg hover:shadow-[0_20px_60px_rgba(30,58,138,0.4)]" 
              width={300} 
              height={200} 
            />
            <h2 className="text-xl font-bold">Search Grant Rates By Office</h2>
          </div>
          <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <Image 
              src={'/pie-chart.png'} 
              alt="Pie Chart" 
              className="h-56 w-auto mb-6 object-contain shadow-2xl rounded-lg hover:shadow-[0_20px_60px_rgba(30,58,138,0.4)]" 
              width={300} 
              height={200} 
            />
            <h2 className="text-xl font-bold">Search Grant Rates By Nationality</h2>
          </div>
          <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <Image 
              src={'/line-graph.png'} 
              alt="Line Graph" 
              className="h-44 w-auto mb-6 object-contain shadow-2xl rounded-lg hover:shadow-[0_20px_60px_rgba(30,58,138,0.4)]" 
              width={300} 
              height={160} 
            />
            <h2 className="text-xl font-bold">Search Grant Rates Over Time</h2>
          </div>
        </div>

        {/* 3. BUTTONS WITH ONCLICK HANDLERS ADDED BACK */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => router.push('/graphs')} 
            className="bg-[#3b82f6] text-white px-6 py-2 text-sm hover:bg-[#1e40af] transition-all duration-300 hover:scale-105"
          >
            View the Data
          </button>
          <button 
            onClick={() => downloadCSV && downloadCSV()} 
            disabled={isDataLoading || !graphData}
            className={`px-6 py-2 text-sm transition-all duration-300 ${
              isDataLoading || !graphData
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-[#3b82f6] text-white hover:bg-[#1e40af] hover:scale-105'
            }`}
          >
            {isDataLoading ? 'Loading Data...' : 'Download the Data'}
          </button>
        </div>
      </section>

      {/* 4. MISSION SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-center py-20 px-10 gap-20 max-w-7xl mx-auto bg-white border-l-4 border-[#3b82f6]">
        <Image src={'/paper-stack.jpg'} alt="Files" className="rounded-3xl shadow-2xl w-full md:w-1/2 h-[450px] object-cover h-auto w-auto" width={700} height={450} />
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
        <button className="bg-[#3b82f6] text-white px-10 py-2 text-sm hover:bg-[#1e40af] mb-16 transition-all duration-300 hover:scale-105">
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
    <Footer />
    </>
  );
}

export default function Home() {
  return (
    <ProvideAppContext>
      <LandingPageContent />
    </ProvideAppContext>
  );
}

