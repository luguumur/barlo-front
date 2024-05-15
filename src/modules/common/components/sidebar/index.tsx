// Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className='relative'>
<div id="social-media-sidebar">
      <ul>
        <li className="side-social facebook">
          <i className="icon-facebook"><a href="#"></a></i>
        </li>
        <li className="side-social twitter">
          <i className="icon-twitter"><a href="#"></a></i>
        </li>
        <li className="side-social youtube">
          <i className="fa fa-youtube-play"><a href="#"></a></i>
        </li>
        <li className="side-social instagram">
          <i className="fa fa-instagram"><a href="#"></a></i>
        </li>
        <li className="side-social google-plus">
          <i className="fa fa-google-plus"><a href="#"></a></i>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
