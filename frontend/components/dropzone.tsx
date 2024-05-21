"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { ArrowLeftFromLine, Download, XCircle } from 'lucide-react';

interface Props {
    data: string | null;
    updateData: () => void;
    updateStack: (data?: string) => void;
    stackIndex: number;
}

export function Dropzone({ data, updateData, updateStack, stackIndex }: Props) {

    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [outputImageUrl, setoutputImageUrl] = useState<string | null>(null);
    const [stackUrls, setStackUrls] = useState<string[]>([]);
    const [additionalData, setadditionalData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
        if (fileRejections.length > 0) {
            const rejectedFile = fileRejections[0];
            const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
            if (rejectedFile.file.size > maxSizeBytes) {
                alert("File size exceeds the limit of 5 MB.");
            }
        } else if (acceptedFiles.length === 1) {
            setSelectedImage(acceptedFiles[0]);
            console.log(acceptedFiles);
        }
    }, []);

    const { getRootProps } = useDropzone({
        onDrop: (outputImageUrl === null) ? onDrop : () => {
            // Alert message design
            const alertMessage = document.createElement('div');
            alertMessage.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50';
            alertMessage.textContent = 'Clear the file first';
            document.body.appendChild(alertMessage);
            setTimeout(() => {
                alertMessage.remove();
            }, 2000);
        },
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg',]
        },
        maxSize: 5 * 1024 * 1024,
        maxFiles: 1
    });

    useEffect(() => {
        let istransfer: boolean = false;

        if (selectedImage) {
            if (outputImageUrl) {
                setBlobUrl(outputImageUrl);
                istransfer = true;
            }
            else {
                const blobUrl = URL.createObjectURL(selectedImage);
                setBlobUrl(blobUrl);
            }
        } else {
            setBlobUrl(null);
        }

        if (!istransfer)
            emptyStackUrls();

        setoutputImageUrl(null);
        setadditionalData(null);
        updateData();
    }, [selectedImage]);

    useEffect(() => {
        if (data) {
            handleSubmit();
        }
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            if (stackIndex < stackUrls.length) {
                setoutputImageUrl(stackUrls[stackIndex]);
                try {
                    const response = await fetch(stackUrls[stackIndex]);
                    const blob = await response.blob();
                    const file = new File([blob], 'blob', { type: blob.type });
                    setSelectedImage(file);

                } catch (error) {
                    console.error('Error converting Blob URL to File:', error);
                }
            }
        };
        fetchData();
    }, [stackIndex]);


    function addUrlToStackUrls(data: string, url: string) {
        updateStack(data);
        setStackUrls([...stackUrls, url]);
    };

    function emptyStackUrls() {
        updateStack();
        setStackUrls([]);
    };

    function removeSelectedImage(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        setSelectedImage(null);
        setoutputImageUrl(null);
    }

    function downloadImage(url: string, filename: string) {

        if (url && filename) {

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = filename;

            anchor.click();
        }
    }

    async function transferImage() {

        if (outputImageUrl) {

            try {
                const response = await fetch(outputImageUrl);
                const blob = await response.blob();
                const file = new File([blob], 'blob', { type: blob.type });
                setSelectedImage(file);

            } catch (error) {
                console.error('Error converting Blob URL to File:', error);
            }

        } else {
            // Alert message design
            const alertMessage = document.createElement('div');
            alertMessage.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50';
            alertMessage.textContent = 'No image to transfer';
            document.body.appendChild(alertMessage);
            setTimeout(() => {
                alertMessage.remove();
            }, 1000);
        }
    }

    function handleSubmit() {

        if (data && selectedImage && blobUrl) {
            // Convert Blob URL to Blob object
            fetch(blobUrl)
                .then(response => response.blob())
                .then(blob => {
                    // Create FormData object
                    const formData = new FormData();
                   
                    
                    formData.append('image', blob, 'image.jpg'); // 'image' is the field name
                    formData.append('mode', data); // Append data for mode of operation
                    setLoading(true); // Set loading state to true when submitting
                    // Send FormData to the backend
                    fetch('http://127.0.0.1:8000/upload', {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(jsonData => {
                            // Extract image data and additional data from the response
                            const imageData = jsonData.image_data;
                            const additionalData = jsonData.additional_data;

                            // Convert base64-encoded image data to a Blob
                            const byteCharacters = atob(imageData);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            const blob = new Blob([byteArray], { type: 'image/jpeg' });

                            // Create URL for the processed image
                            const outputImageUrl = URL.createObjectURL(blob);

                            setoutputImageUrl(outputImageUrl);
                            addUrlToStackUrls(data, outputImageUrl);
                            setadditionalData(additionalData);

                            // Alert message design
                            const alertMessage = document.createElement('div');
                            alertMessage.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50';
                            alertMessage.textContent = 'Completed Operation';
                            document.body.appendChild(alertMessage);
                            setTimeout(() => {
                                alertMessage.remove();
                            }, 5000);

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        })
                        .finally(() => {
                            setLoading(false); // Set loading state to false when response is received
                        });
                })
                .catch(error => {
                    console.error('Error fetching blob:', error);
                });
        } else {
            // Alert message design
            const alertMessage = document.createElement('div');
            alertMessage.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50';
            alertMessage.textContent = 'No image uploaded';
            document.body.appendChild(alertMessage);
            setTimeout(() => {
                alertMessage.remove();
            }, 1000);
        }
    }


    return (
        <section className="w-full h-full">
            <div className="flex justify-center pb-5 pt-5">
                <h2 className="text-center text-3xl font-bold italic">Upload</h2>
            </div>
            <div className='flex justify-between'>
                <div {...getRootProps()} className='ml-20 m-5 w-[400px] aspect-square rounded-md border border-2 border-sky-500 border-dashed flex justify-center items-center relative'>
                    {
                        blobUrl && (
                            <div className='absolute top-0 inset-x-0 flex justify-between p-2'>
                                <div className='text-green-500 cursor-pointer'
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        downloadImage(blobUrl, blobUrl.split('/').pop() + ".jpg");
                                    }}>
                                    <Download size={30} />
                                </div>
                                <div className='text-red-500 cursor-pointer' onClick={removeSelectedImage}>
                                    <XCircle size={30} />
                                </div>
                            </div>
                        )
                    }
                    {
                        blobUrl ?
                            <img src={blobUrl} />
                            :
                            <div className='text-xl font-500 text-center'>Input Image</div>
                    }
                </div>

                <div className='mr-20 m-5 w-[400px] aspect-square rounded-md border border-2 border-sky-500 border-dashed flex justify-center items-center relative'>
                    {
                        outputImageUrl && (
                            <div className='absolute top-0 inset-x-0 flex justify-between p-2'>
                                <div className='text-yellow-500 cursor-pointer'
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        transferImage();
                                    }}>
                                    <ArrowLeftFromLine size={30} />
                                </div>
                                <div className='text-green-500 cursor-pointer'
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        downloadImage(outputImageUrl, outputImageUrl.split('/').pop() + ".jpg");
                                    }}>
                                    <Download size={30} />
                                </div>
                            </div>
                        )
                    }
                    {
                        outputImageUrl ?
                            <img src={outputImageUrl} />
                            :
                            <div className='text-xl font-500 text-center'>Output Image</div>
                    }
                </div>
            </div>
            <div>
                {
                    loading && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <div className="text-center text-gray-800 font-semibold mb-4">Loading ...</div>
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-center pb-5 pt-5">
                {
                    additionalData && (<p className="text-center text-xl font-bold italic">
                        {additionalData}
                    </p>)
                }
            </div>
        </section>
    )
}