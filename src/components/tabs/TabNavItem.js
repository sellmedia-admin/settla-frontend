import React from "react";
const TabNavItem = ({ id, title, icon, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
    <div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center active:text-white mx-auto mb-2">
      <div className="">{icon}</div>
    </div>
     <p className="text-[10px] md:text-[19px]">{ title }</p>
   </li>
 );
};
export default TabNavItem;