// components/Tabs.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Markdown from 'react-markdown';

type Tab = {
  title: string;
  image: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  // console.log(tabs)

  const [activeTab, setActiveTab] = useState(0);
  const {locale, locales, route, asPath} = useRouter();

  const changeTab = (index: number) => {
    setActiveTab(index);
  };
  

  
  return (
    <>
      <div className="row detail-box ">
        <div className='col-xxs-12' >
          {tabs[activeTab].title == 'icon-camera' && tabs[activeTab].image}
          {tabs[activeTab].title == 'icon-play' && tabs[activeTab].image && <Markdown>{tabs[activeTab].image as string}</Markdown>}
          {tabs[activeTab].title == 'icon-360' && tabs[activeTab].image && <Markdown>{tabs[activeTab].image as string}</Markdown>}
        </div>
      </div>
      <div className='tabs tabs--small media-tabs push-xxs--top flush-xs--top js-media-tabs'>
        <ul className='tabs__nav js-tabs'>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => changeTab(index)} className={index === activeTab ? 'tab-link active' : 'tab-link'}>
                <span className={tab.title}>
                </span>
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
