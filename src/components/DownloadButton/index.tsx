/**
 *
 */

import React from 'react';
import { IoMdDownload } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import { DownloadItem, addItem } from '../../store/download';

import './style.less';

export type DownloadButtonProps = {
  data: DownloadItem[];
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    data.forEach(d => dispatch(addItem(d)));
  };

  if (data.length <= 0) {
    return null;
  }

  return (
    <button className="icon-button__download" onClick={handleClick}>
      <IoMdDownload />
    </button>
  );
};
export default DownloadButton;
