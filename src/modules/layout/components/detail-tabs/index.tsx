// components/Tabs.tsx
import { useState } from 'react';

type Tab = {
  title: string;
  image: any;
  content: any;
};

type TabsProps = {
  tabs: Tab[];
};

const DetailsTab: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };
  let lastGroupName = '';
  return (
    <>
      <div className='tabs__nav-wrapper clearfix'>
        <ul className='tabs__nav cleafix js-tabs p-0'>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => changeTab(index)} className={index === activeTab ? 'tab-link active' : 'tab-link'}>
              {/* <a href={`#`+tab.title} title="Photos" data-type="image">
                {tab.title}
              </a> */}
              <span>{tab.title}</span>
            </li>
          ))}
        </ul>
        <div className="tabs__content" >
          <div className="product__specs tabs__tab active" id="specs">
            <div className="specs specs--list">
              {tabs[activeTab].title == "Specifications" &&
                tabs[activeTab].content?.map((tab:any, index:any) => {
                  const showGroupName = tab.group.name !== lastGroupName;
                  lastGroupName = tab.group.name;
          
                  return (
                    <div key={index}>
                      {showGroupName && <h4>{tab.group.name}</h4>}
                      <dl className="clearfix flush--top">
                        <div className="specs__row clearfix">
                          <dt>{tab.attribute.name}</dt>
                          <dd data-english="C1.1" data-metric="">{tab.string_value}</dd>
                        </div>
                      </dl>
                    </div>
                  );
                })
              }
              {
                tabs[activeTab].title == "Benefits and Features" &&
                  <>
                  {tabs[activeTab].content}
                  </>
              }
            </div>
          </div>
        </div>
      </div>
      {/* <button
            key={index}
            onClick={() => changeTab(index)}
            className={index === activeTab ? 'active' : ''}
          >
            {tab.title}
          </button> */}
    </>
   
  );
};

export default DetailsTab;
