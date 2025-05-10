type SummarizationStepsProps = {
  activeStep: number;
};

const SummarizationSteps = ({ activeStep }: SummarizationStepsProps) => {
  return (
    <div className="flex items-center justify-center space-x-6 mb-20">
      <div className="flex flex-col items-center">
        <span className={`text-lg font-semibold rounded-full px-8 py-3 shadow font-nunito ${activeStep === 1 ? 'text-gray-800 bg-gray-200' : 'text-gray-400 bg-gray-100'}`}>UPLOAD</span>
      </div>
      <span className="text-3xl text-gray-400">&#8594;</span>
      <div className="flex flex-col items-center">
        <span className={`text-lg font-semibold rounded-full px-8 py-3 font-nunito ${activeStep === 2 ? 'text-gray-800 bg-gray-200' : 'text-gray-400 bg-gray-100'}`}>UNDERSTAND</span>
      </div>
    </div>
  );
};

export default SummarizationSteps;
