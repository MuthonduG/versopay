import { FaRecycle } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";

const FeaturesPage = () => {
  return (
    <section className="flex justify-center items-center w-full bg-[#e8f1ff] mt-16 mb-10 py-10">
      <div className="mt-10 w-[70%]">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-[#0f1724] text-3xl md:text-4xl font-semibold mb-2">
            Simplify Your Financial Operations
          </h2>
          <p className="text-[#606874] text-base md:text-lg max-w-2xl mx-auto leading-9 mt-10">
            Manual tracking is error-prone and slow. Versopay brings automation to your collections and disbursements so you can focus on growth.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 lg:gap-8 justify-items-center">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl w-full max-w-sm text-left shadow-md">
            <div className="bg-[#e8f1ff] rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaRecycle className="text-[#5293df] text-3xl" />
            </div>
            <h3 className="text-[#0f1724] text-xl font-semibold mb-2 text-center">
              Recurring Collections
            </h3>
            <p className="text-[#a7b4c8] text-sm leading-9">
              Set up daily, weekly, or monthly payment plans. Automatically prompt members via STK push and track compliance in real-time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl w-full max-w-sm text-left shadow-md">
            <div className="bg-[#e8f1ff] rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <IoPeopleSharp className="text-[#5293df] text-3xl" />
            </div>
            <h3 className="text-[#0f1724] text-xl font-semibold mb-2 text-center">
              Bulk Disbursements
            </h3>
            <p className="text-[#a7b4c8] text-sm leading-9">
              Pay salaries, dividends, or vendor invoices in one click. Support for thousands of recipients across different mobile networks.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl w-full max-w-sm text-left shadow-md">
            <div className="bg-[#e8f1ff] rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <VscGraph className="text-[#5293df] text-3xl" />
            </div>
            <h3 className="text-[#0f1724] text-xl font-semibold mb-2 text-center">
              Automated Reconciliation
            </h3>
            <p className="text-[#a7b4c8] text-sm leading-9">
              Real-time dashboards match incoming payments to member accounts instantly. Say goodbye to manual spreadsheets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;
