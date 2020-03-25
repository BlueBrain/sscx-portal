import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter } from 'react-icons/all';
import { FaFacebookF } from 'react-icons/all';
import { FaLinkedinIn } from 'react-icons/all';

import './style.less';

const classPrefix = 'footer__';

const FullPage: React.FC<{}> = () => {
  return (
    <div className={`${classPrefix}basis`}>
      <div className={`${classPrefix}container`}>
        <div className={`${classPrefix}address`}>
          <h4>Blue Brain Project</h4>
          <p>EPFL/Campus Biotech</p>
          <p>Chemin des Mines 9</p>
          <p>CH-1202 Geneva</p>
          <p>Switzerland</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            <Link to="#">Submission</Link>
          </p>
          <p>
            <Link to="#">Chat</Link>
          </p>
        </div>
        <div>
          <h4>Share and follow us</h4>
          <div className={`${classPrefix}social-media`}>
            <div>
              <a href="#">
                <span className={`${classPrefix}social-media-icon`}>
                  <FaTwitter />
                </span>
                <span className={`${classPrefix}social-link`}>
                  @BlueBrainPjt
                </span>
              </a>
            </div>
            <div>
              <a href="#">
                <span className={`${classPrefix}social-media-icon`}>
                  <FaFacebookF />
                </span>
                <span className={`${classPrefix}social-link`}>
                  @BlueBrainProject
                </span>
              </a>
            </div>
            <div>
              <a href="#">
                <span className={`${classPrefix}social-media-icon`}>
                  <FaLinkedinIn />
                </span>
                <span className={`${classPrefix}social-link`}>
                  @BlueBrainProject
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPage;
