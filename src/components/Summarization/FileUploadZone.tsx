import { useDropzone } from 'react-dropzone'
import type { FileRejection } from 'react-dropzone';
import { useCallback } from "react";
import { toast } from 'sonner'
import { supabase } from "@/lib/supabase";

type FileUploadZoneProps = {
    onDropAccepted: (filePath: string) => void
}

const FileUploadZone = ({ onDropAccepted }: FileUploadZoneProps) => {
    const handleDropAccepted = useCallback( async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            const { data, error } = await supabase
                .storage
                .from('pdf-papers')
                .upload(`${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'application/pdf'
                });

            if (error) {
                console.error(`Failed to upload ${file.name}: ${error.message}`);
                if ( error.name === 'Duplicate') {
                    toast(`Failed to upload ${file.name}. File name already exist please use a different name`);
                }
            } else {
                onDropAccepted(data.path);
                // take the path from the response and pass it up for creating the signed URL
                toast(`${file.name} uploadeded successfully!`);
            }
        }
    }, [onDropAccepted]);

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
        fileRejections.forEach((rejection: FileRejection) => {
            toast(`${rejection.file.name} has failed to upload`);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted: handleDropAccepted,
        onDropRejected,
        accept: { 'application/pdf': [] },
        maxSize: 52428800,
        maxFiles: 1
    });
  return (
    <div {...getRootProps({
        className: "flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white/60 mb-6"
    })}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
          <span className="text-gray-700 font-medium">Select or drop files here</span>
          <span className="text-xs text-gray-500">PDF files only</span>
        </div>
    </div>
  );
};

export default FileUploadZone;
