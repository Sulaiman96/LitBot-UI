import { useState, useEffect} from "react";
import FileUploadZone from "./FileUploadZone";
import UploadsTable from "./UploadsTable";
import {supabase} from "@/lib/supabase";
import { Button } from "@/components/ui/button"

type UploadPanelProps = {
  onContinue?: (file: { id: string; name: string }) => void;
  onUpload?: (file: bucketFilePath) => void;
};
type bucketFilePath = string;

const UploadPanel = ({ onContinue, onUpload }: UploadPanelProps) => {
  // Store uploaded files as { id, name }
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null);

  // Takes the file path from the FileUploadZone and passes it up for creating a signed URL
  const handleAcceptedFile = (file: bucketFilePath) => {
      if (onUpload) {
          onUpload(file);
      }
  };

  const handleContinue = () => {
    if (onContinue && selectedFile) {
      onContinue(selectedFile);
    }
  };

    //Retrieve the previously uploaded files from Supasbase on component load
    useEffect( () => {
        const fetchFiles = async () => {
            const { data, error } = await supabase
                .storage
                .from('pdf-papers')
                .list('', {
                    limit: 20,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                });

            if (error) {
                // TODO: ERROR LOGGING
                console.error('first', error)
            } else {
                // Validate the files exist in the list
                // TODO: we will need to validate the files exist against the users
                const validFiles = data
                    .filter(file => file?.metadata?.mimetype === 'application/pdf' && file.id)
                    .map(file => ({ id: file.id, name: file.name }));

                setUploadedFiles((previousFiles) => {
                    const existingIds = new Set(previousFiles.map(file => file.id));
                    const newUniqueFiles = validFiles.filter(file => !existingIds.has(file.id));

                    return [...previousFiles, ...newUniqueFiles];
                });

            }
        }
        fetchFiles();
    }, []);

  // Only enable continue if a file is selected
  const canContinue = selectedFile !== null;

  return (
    <div className="bg-bone-light rounded-2xl shadow-lg p-8 max-w-5xl mx-auto flex flex-col items-center border border-neutral-darkest">
      <p className="text-center text-gray-700 mb-6 font-nunito">
        Please upload papers for data extraction and summarization
      </p>
      <FileUploadZone onDropAccepted={handleAcceptedFile}/>
      <UploadsTable files={uploadedFiles} selectedFile={selectedFile} onSelect={setSelectedFile} />
      <div className="flex justify-end w-full mt-4">
        <Button
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
};

export default UploadPanel;
