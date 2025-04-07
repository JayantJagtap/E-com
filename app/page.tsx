'use client'
import RuleTest from "./components/RuleBuilder";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-3 py-5 border-b mx-6">
          <h1 className="text-xl">Rules</h1>
          <p className="text-gray-600 mt-1">
            The offer will be triggered based on the rules in this section
          </p>
        </div>

        <div className="p-6 ">
          <p className="text-lg px-3">
            Show offer if
          </p>
          <RuleTest />
        </div>


      </div>
    </div>
  );
};

export default Home;