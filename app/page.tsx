'use client'

import { RuleBuilder } from "./components/RuleBuilder";
// import RuleItem from "./components/RuleItem";




const Home: React.FC = () => {



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-xl">Rules</h1>
          <p className="text-gray-600 mt-1">
            The offer will be triggered based on the rules in this section
          </p>
        </div>

        <div className="p-6">
          <p className="text-lg">
            Show offer if
          </p>
          {/* <RuleItem /> */}
          <RuleBuilder />
        </div>


      </div>
    </div>
  );
};

export default Home;