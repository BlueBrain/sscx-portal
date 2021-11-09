import React, { useState } from 'react';
import { Select } from 'antd';
import throttle from 'lodash/throttle';

import style from  './styles.module.scss';

import { Color } from '../../types';


const { Option } = Select;

type QuickSelectorProps = {
  color?: Color;
  entries: Array<{
    title: string;
    currentValue: string;
    values: string[];
    onChange: Function;
  }>
};

const QuickSelector: React.FC<QuickSelectorProps> = ({ entries, color = '' }) => {
  const [visible, setVisible] = useState<boolean>(false);

  React.useEffect(() => {
    const scrollHandler = () => {
      const { pageTop, height } = window.visualViewport;
      setVisible(pageTop > (height + 84));
    }

    const scrollHandlerThrottled = throttle(scrollHandler, 200);
    document.addEventListener('scroll', scrollHandlerThrottled, { passive: true });

    return () => {
      document.removeEventListener('scroll', scrollHandlerThrottled);
    };
  }, []);

  return (
    <div className={`${style.quickSelectorContainer} set-accent-color--${color} ${visible ? style.show : ''}`}>
      {entries.map(({ title, currentValue, values, onChange }) => {

        return (
          <div className={style.quickSelectorItem} key={title}>
            <label>{title}:</label>
            <Select
              size="small"
              showSearch
              style={{ width: 200 }}
              placeholder={title}
              onChange={(value) => onChange(value)}
              value={currentValue}
            >
              {values.map(value => (
                <Option value={value} key={value}>{value}</Option>
              ))}
            </Select>
          </div>
        );
      })}
    </div>
  );
};


export default QuickSelector;
