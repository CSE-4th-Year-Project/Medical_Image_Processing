"use client";

import { Dropzone } from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Upload() {

  const [dataToSend, setDataToSend] = useState<string | null>(null);
  const [stackIndex, setstackIndex] = useState<number>(0);

  const handleSubmit = (data: string) => {
    setDataToSend(data);
  };

  const updateData = () => {
    setDataToSend(null);
  };

  const [stack, setStack] = useState<string[]>([]);

  const updateStack = (data?: string) => {
    if (data) {
      const showString: string = "Step " + (stack.length + 1) + ": " + mapStack(data);
      setStack([...stack, showString]);
    } else {
      setStack([]);
    }
  };

  const handleStackClick = (index: number) => {
    if (index < stack.length) {
      setstackIndex(index);
    } else {
      alert("Invalid index on Stack.");
    }
  };

  const mapStack = (data: string): string => {

    const mapping: { [key: string]: string } = {
      "contrast": "Contrast",
      "contrast_qd": "Quadratic Histogram",
      "contrast_gl": "Global Local Enhance",
      "saltpepper": "Salt Pepper Noise",
      "saltpepper_fas": "Fast Selective Filter",
      "saltpepper_lpd": "Local Pixel Filter",
      "gaussian": "Gaussian Noise",
      "gaussian_spt": "Pyramid Filter",
      "gaussian_owbf": "Bilateral Filter",
      "classify": "Classification",
      "classify_mobnet": "Mobile Net",
      "classify_effnet": "Efficient Net",
      "classify_xception": "Xception Net",
      "classify_inception": "Inception Net",
      "segment": "Segmentation",
      "segment_rfcm": "Rough Fuzzy C Means",
      "segment_fcmnls": "Fuzzy Non Local",
      "analysis": "Analysis"
    };

    return mapping[data] || "Unknown";
  };

  return (
    <section className="w-full h-full flex">

      <div className="w-1/7 h-full ml-4 flex flex-col items-center">
        <div className="mb-3">
          <Button variant="ghost" size="lg" className="text-xl mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Operations
          </Button>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Contrast Enhancement
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSubmit("contrast_qd")}>
                QDHE
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSubmit("contrast_gl")}>
                GLIE
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Salt Pepper Noise Removal
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSubmit("saltpepper_fas")}>
                FASMF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSubmit("saltpepper_lpd")}>
                LPDAMF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Gaussian Noise Removal
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSubmit("gaussian_spt")}>
                SPT
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSubmit("gaussian_owbf")}>
                OWBF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Tumor Classification
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSubmit("classify_mobnet")}>
                Mobile Net
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSubmit("classify_xception")}>
                Xception Net
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSubmit("classify_inception")}>
                Inception Net
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Tumor Segmentation
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSubmit("segment_rfcm")}>
                RFCM
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSubmit("segment_fcmnls")}>
                FCM-NLS
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleSubmit("analysis")}>
            Region Analysis
          </Button>
        </div>
      </div>

      <div className="w-4/7 h-full">
        <Dropzone data={dataToSend} updateData={updateData} updateStack={updateStack} stackIndex={stackIndex} />
      </div>
      <div className="w-2/7 h-full mr-4 flex flex-col items-center">
        {
          (stack.length != 0) && (
            <div className="mb-3">
              <Button variant="ghost" size="lg" className="text-xl mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Stack
              </Button>
            </div>
          )
        }
        {
          stack.map((stack, index) => (
            <div className="" key={index}>
              <Button variant="outline" size="lg" className="text-md mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleStackClick(index)}>
                {stack}
              </Button>
            </div>
          ))
        }
      </div>
    </section>
  );
}
