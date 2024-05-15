// components/Tabs.tsx
import { useState } from 'react';

type Tab = {
  title: string;
  image: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="row detail-box ">
        <div className='col-xxs-12' >
          {tabs[activeTab].image}
        </div>
      </div>
      <div className='tabs tabs--small media-tabs push-xxs--top flush-xs--top js-media-tabs'>
        <ul className='tabs__nav js-tabs'>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => changeTab(index)} className={index === activeTab ? 'tab-link active' : 'tab-link'}>
              <a href="#product-photos" title="Photos" data-type="image">
                <span className={tab.title}>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="tabs__content">
          {tabs[activeTab].content}
        </div>
      </div>
    </>
   
  );
};

export default Tabs;
