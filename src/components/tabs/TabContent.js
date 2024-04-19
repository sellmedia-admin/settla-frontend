import React from "react";
 
const TabContent = ({id, activeTab, children}) => {
 return (
   activeTab === id ? <div className="TabContent text-left">
     { children }
   </div>
   : null
 );
};
 
export default TabContent;