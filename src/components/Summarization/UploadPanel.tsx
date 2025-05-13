import { useState } from "react";
import FileUploadZone from "./FileUploadZone";
import UploadsTable from "./UploadsTable";

type UploadPanelProps = {
  onContinue?: () => void;
};

const dummyFiles = [
  { id: 1, title: "Measuring the Optical Concurrence of Vector Beams with an Atomic-State Interferometer" },
  { id: 2, title: "Measuring the Optical Concurrence of Vector Beams with an Atomic-State Interferometer" },
  { id: 3, title: "Measuring the Optical Concurrence of Vector Beams with an Atomic-State Interferometer" },
  // Add more for testing scroll
];

const UploadPanel = ({ onContinue }: UploadPanelProps) => {
  const [files] = useState(dummyFiles);

  return (
    <div className="bg-bone-light rounded-2xl shadow-lg p-8 max-w-5xl mx-auto flex flex-col items-center border border-neutral-darkest">
      <p className="text-center text-gray-700 mb-6 font-nunito">
        Please upload papers for data extraction and summarization
      </p>
      <FileUploadZone />
      <UploadsTable files={files} />
      <div className="flex justify-end w-full mt-4">
        <button
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-semibold hover:bg-gray-300 transition"
          onClick={onContinue}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
};

export default UploadPanel;
