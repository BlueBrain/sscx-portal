import React from 'react';

import './style.less';

const classPrefix = 'info-box__';

type InfoBoxProps = {
  title?: string;
  text: string;
  maxChars?: number
};

const isShorter = (text: string, maxChars: number): boolean => text.length <= maxChars

const truncate = (text: string, maxChars: number): string => {
  if (isShorter(text, maxChars)) return text;
  const words = text.trim().split(' ');
  let truncatedText = '';
  let i = 0;
  while (isShorter(truncatedText, maxChars)) {
    truncatedText += ' ' + words[i];
    i++;
  }
  return truncatedText + '…';
};

const InfoBox: React.FC<InfoBoxProps> = ({ title, text, maxChars = 200 }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [currentText, setCurrentText] = React.useState(text);

  React.useEffect(() => {
    setCurrentText(expanded ? text : truncate(text, maxChars));
  }, [expanded]);

  return <div className={`${classPrefix}basis`}>
    <h3>{title}</h3>
    <p>{currentText}</p>
    {!isShorter(text, maxChars) && <span onClick={() => setExpanded(!expanded)}>Read {expanded ? 'less' : 'more…'}</span>}
  </div>;
};

export default InfoBox;
