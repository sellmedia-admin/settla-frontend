import React from "react";
const TabNavItem = ({ id, title, icon, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
    <div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center mx-auto mb-2">
      <img src={icon} alt="icon" />
    </div>
     <p>{ title }</p>
   </li>
 );
};
export default TabNavItem;