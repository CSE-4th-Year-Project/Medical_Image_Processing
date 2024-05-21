"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [showDevelopersText, setShowDevelopersText] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState([0, 1, 2, 3]);
  const images = ["/picture1.png", "/picture2.png", "/picture3.png", "/picture4.png","/picture5.png", "/picture6.png", "/picture7.png", "/picture8.png",];

  useEffect(() => {
    const interval = setInterval(() => {
      
      setCurrentImageIndices((prevIndices) => {
        const newIndex1 = (prevIndices[0] + 4) % images.length;
        const newIndex2 = (prevIndices[1] + 4) % images.length;
        const newIndex3 = (prevIndices[2] + 4) % images.length;
        const newIndex4 = (prevIndices[3] + 4) % images.length;
        return [newIndex1, newIndex2, newIndex3, newIndex4];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center max-w-10xl">
      <div className="flex flex-col items-center justify-center overflow-hidden relative pt-5">
        <h1 className="text-3xl font-bold mb-2 p-5">Medical Image Processing Application</h1>

        <div className="grid grid-cols-4 gap-16 p-10">
          {currentImageIndices.map((index, iter) => (
            <div key={iter} className="relative">
              <img src={images[index]} alt={`Medical Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" style={{ width: '300px', height: '300px' }} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button variant="ghost" size="lg" className="text-lg mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Quick Links:
          </Button>
          <Link href="/dashboard">
            <Button variant="link" size="lg" className="text-lg mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Dashboard
            </Button>
          </Link>
          <Link href="/upload">
            <Button variant="link" size="lg" className="text-lg mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Upload
            </Button>
          </Link>
          <Button variant="link" size="lg" className="text-lg mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => (showDevelopersText) ? setShowDevelopersText(false) : setShowDevelopersText(true)}>
            Developers
          </Button>
        </div>
        {showDevelopersText && (
          <p className="mt-4 text-lg text-center font-bold">
            {"This project has been developed by "}
            <a href="https://in.linkedin.com/in/arinjaybhowmick" target="_blank">Arinjay Bhowmick</a>
            {", "}
            <a href="https://in.linkedin.com/in/soham-ghosh-594478219" target="_blank">Soham Ghosh</a>
            {", "}
            <a href="https://www.linkedin.com/in/prattay-paul-379455244" target="_blank">Prattay Paul</a>
            {", "}
            <a href="https://in.linkedin.com/in/abhik-mitra-8b40ab1a9" target="_blank">Abhik Mitra</a>
            {" under the guidance of "}
            <a href="https://scholar.google.com/citations?hl=en&user=HLHz2s0AAAAJ" target="_blank">Prof. Amiya Halder</a>
          </p>
        )}
      </div>
    </div>
  );
}
