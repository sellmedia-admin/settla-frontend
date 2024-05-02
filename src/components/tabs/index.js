import React, { useState } from "react";
import CreateTab from "./CreateTab.js";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import QuickKYBTab from "./QuickTab.js";
import PayInTab from "./PayInTab.js";
import PayOutTab from "./PayOutTab.js";
import ConversionTab from "./ConversionTab.js";
import ReceiptTab from "./ReceiptTab.js";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GoShieldCheck } from "react-icons/go";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline, IoDocumentTextOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="Tabs max-w-[1076px] mx-auto mb-28">
      <ul className="nav flex justify-center max-w-[790px] mx-auto">
        <TabNavItem title="Create Account" icon={<AiOutlineUserAdd size={23} />} id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Quick KYB" icon={<GoShieldCheck size={23} />} id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Pay In" icon={<IoArrowDownCircleOutline size={23} />} id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Pay Out" icon={<IoArrowUpCircleOutline size={23} />} id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Conversion" icon={<FiRefreshCw size={23} />} id="tab5" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Receipt" icon={<IoDocumentTextOutline size={23} />} id="tab6" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <CreateTab />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <QuickKYBTab />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <PayInTab />
        </TabContent>
        <TabContent id="tab4" activeTab={activeTab}>
            <PayOutTab />
        </TabContent>
        <TabContent id="tab5" activeTab={activeTab}>
            <ConversionTab />
        </TabContent>
        <TabContent id="tab6" activeTab={activeTab}>
            <ReceiptTab />
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;