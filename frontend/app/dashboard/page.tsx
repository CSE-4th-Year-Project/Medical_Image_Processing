"use client";

import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Dashboard() {

  const [showDevelopersText, setShowDevelopersText] = useState(false);

  function showCard(type: string) {
    const card = document.getElementById(type);
    card?.classList.toggle('hidden');
  }

  function closeCard(type: string) {
    const card = document.getElementById(type);
    card?.classList.add('hidden');
  }

  return (
    <div className="w-full pt-10 p-5">
      <h1 className="text-3xl font-bold m-4 mt-0">Welcome All</h1>
      <p className="text-m m-4">
      Explore the dashboard for relevant information on our medical image application. To process medical images, navigate to the upload page.
      </p>
      <div className="w-full flex justify-center items-center border-t border-gray-300 py-4 gap-5">

        <div className="w-2/6 flex flex-col items-center p-2 m-2">
          <p className="text-m text-justify mb-2">
            Medical Image Processing is a field that involves applying a variety of techniques and algorithms to images obtained from medical imaging technologies like X-ray, MRI (Magnetic Resonance Imaging), CT (Computed Tomography), ultrasound, PET (Positron Emission Tomography), and more.
          </p>
          <p className="text-m text-justify mb-2">
            These techniques and algorithms are designed to analyze, enhance, and extract meaningful information from medical images, assisting healthcare professionals in diagnosis, treatment planning, and medical research.
          </p>
          <p className="text-m text-justify mb-2">
            Through Medical Image Processing, healthcare providers can obtain detailed insights into the structure and function of organs and tissues, aiding in the detection and characterization of diseases and abnormalities.
          </p>
        </div>

        <div className="w-4/6">
          <ul className="list-none grid grid-cols-2 gap-5">
            <li className="p-5 border border-gray-200 rounded" onClick={() => showCard('pre-processing')}>
              <h2 className="text-lg font-bold">Pre-processing</h2>
              <p className="text-sm text-justify">
                Steps applied to input image before it is used for analysis or further processing.
                It involves tasks such as noise reduction and image enhancement.
              </p>
            </li>
            <li className="p-5 border border-gray-200 rounded" onClick={() => showCard('classification')}>
              <h2 className="text-lg font-bold">Classification</h2>
              <p className="text-sm text-justify">
                Machine learning task where a model is trained on a labeled dataset to learn relationships.
                It involves assigning a label to input image based on its features.
              </p>
            </li>
            <li className="p-5 border border-gray-200 rounded" onClick={() => showCard('segmentation')}>
              <h2 className="text-lg font-bold">Segmentation</h2>
              <p className="text-sm text-justify">
                Process of partitioning an image into multiple regions based on characteristics.
                It is commonly used in computer vision tasks to identify and separate regions within an image.
              </p>
            </li>
            <li className="p-5 border border-gray-200 rounded" onClick={() => showCard('analysis')}>
              <h2 className="text-lg font-bold">Analysis</h2>
              <p className="text-sm text-justify">
                Examination, interpretation, and understanding of data to identify patterns, or make decisions.
                It involves methods to uncover meaningful information or trends within the data.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div id="pre-processing" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 hidden">
        <div className="fixed top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/4 bg-white dark:bg-black p-5 rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Pre-processing</h2>
            <div className='flex justify-end text-red-500 cursor-pointer' onClick={() => closeCard('pre-processing')}>
              <XCircle size={30} />
            </div>
          </div>
          <div className="text-sm text-justify">
            <ul className="pl-5 space-y-6 pr-5">
              <li>
                <h3 className="text-xl font-semibold">Noise Reduction:</h3>
                <div className="flex justify-center gap-10 ">
                  <div className="flex w-1/2 items-center mr-20">
                    <p>Noise refers to random variations in pixel values that do not represent actual image features. Noise can be introduced during image acquisition or transmission, and it can degrade image quality and affect the accuracy of subsequent analysis. Noise reduction techniques aim to remove or reduce these unwanted variations while preserving important image details.</p>
                  </div>
                  <div className="flex flex-col items-center m-2">
                    <img src="/noise_in.png" alt="Image Noise" className="object-cover rounded-lg" />
                    <p className="mt-2">Noisy Image</p>
                  </div>
                  <div className="flex flex-col items-center m-2">
                    <img src="/noise_out.png" alt="Image Noise" className="object-cover rounded-lg" />
                    <p className="mt-2">Non-noisy Image</p>
                  </div>
                </div>
              </li>
              <li>
                <h3 className="text-xl font-semibold">Image Enhancement:</h3>
                <div className="flex justify-center gap-10 ">
                  <div className="flex w-1/2 items-center mr-20">
                    <p>Image enhancement techniques are used to improve the visual quality of an image by emphasizing certain features or reducing others. This can include adjusting brightness, contrast, and sharpness, as well as applying filters or algorithms to highlight specific details or remove imperfections.</p>
                  </div>
                  <div className="flex flex-col items-center m-2">
                    <img src="/contrast_in.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                    <p className="mt-2">Low Contrast</p>
                  </div>
                  <div className="flex flex-col items-center m-2">
                    <img src="/contrast_out.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                    <p className="mt-2">High Contrast</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="classification" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 hidden">
        <div className="fixed top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/4 bg-white dark:bg-black p-5 rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Classification</h2>
            <div className='flex justify-end text-red-500 cursor-pointer' onClick={() => closeCard('classification')}>
              <XCircle size={30} />
            </div>
          </div>
          <div className="text-sm text-justify">
            <ul className="pl-5 space-y-6 pr-5">
              <li>
                <h3 className="text-xl font-semibold">Training:</h3>
                <div className="flex justify-center gap-10 ">
                  In classification, the model is trained on a labeled dataset, which means each data point in the dataset is associated with a category or label. During the training process, the model learns the relationships between the input features and the corresponding labels.
                  The goal of classification is to learn a mapping from input features to output labels. 
                </div>
              </li>
              <li>
                <h3 className="text-xl font-semibold">Testing:</h3>
                <div className="flex justify-center gap-10 ">
                  Once the model is trained, it can be used to assign a label or category to new input data, such as images. 
                  The model examines the features of the input image and predicts which category it belongs to based on the patterns it learned during training.
                  This involves validating the relationships captured from the data during model training to ensure accurate predictions.
                </div>
              </li>
            </ul>
            <div className="flex justify-center gap-10 mt-10">
              <div className="flex flex-col items-center m-2">
                <img src="/no_tumor.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                <p className="mt-2">No Tumor Image</p>
              </div>
              <div className="flex flex-col items-center m-2">
                <img src="/tumor.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                <p className="mt-2">Tumor Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="segmentation" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 hidden">
        <div className="fixed top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/4 bg-white dark:bg-black p-5 rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Segmentation</h2>
            <div className='flex justify-end text-red-500 cursor-pointer' onClick={() => closeCard('segmentation')}>
              <XCircle size={30} />
            </div>
          </div>
          <div className="text-sm text-justify">
            <div className="flex items-center ">
              <p>
                Segmentation plays a pivotal role in the analysis of brain MRI images, where the objective is to partition the image into distinct regions corresponding to different anatomical structures or tissue types within the brain. This process involves identifying and delineating regions such as gray matter, white matter, cerebrospinal fluid (CSF), lesions, and various anatomical structures like the cortex, ventricles, and subcortical nuclei. 
                <br/><br/>Accurate segmentation is crucial for tasks such as volumetric analysis, lesion detection and quantification, surgical planning, and disease diagnosis and monitoring.
                By segmenting brain MRI images, clinicians can extract quantitative measurements, identify abnormalities, and track changes in brain morphology over time, aiding in the diagnosis and treatment of neurological disorders, multiple sclerosis, brain tumors, and stroke.
              </p>
            </div>
            <div className="flex justify-center gap-10 mt-10">
              <div className="flex flex-col items-center m-2">
                <img src="/brain_image.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                <p className="mt-2">Brain Image</p>
              </div>
              <div className="flex flex-col items-center m-2">
                <img src="/segment_image.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                <p className="mt-2">Segmented Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="analysis" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 hidden">
        <div className="fixed top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/4 bg-white dark:bg-black p-5 rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Analysis</h2>
            <div className='flex justify-end text-red-500 cursor-pointer' onClick={() => closeCard('analysis')}>
              <XCircle size={30} />
            </div>
          </div>
          <div className="text-sm text-justify">
          <div className="flex items-center ">
              <p>
              Analysis encompasses the comprehensive examination, interpretation, and comprehension of data with the aim of discerning underlying patterns or making informed decisions. This multifaceted process involves employing various methodologies and techniques to extract meaningful insights or trends from the image under scrutiny.
              </p>
            </div>
            <div className="flex justify-center gap-10 mt-10">
              <div className="flex flex-col items-center m-2">
                <img src="/analysis_in.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                <p className="mt-2">Input Image</p>
              </div>
              <div className="flex flex-col items-center m-2">
                <img src="/analysis_out.png" alt="Image Enhancement" className="object-cover rounded-lg" />
                <p className="mt-2">Output Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" size="lg" className="text-lg mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Quick Links:
        </Button>
        <Link href="/">
          <Button variant="link" size="lg" className="text-lg mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Home
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
  );
};

