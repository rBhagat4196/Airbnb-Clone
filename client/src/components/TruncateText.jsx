/* eslint-disable react/prop-types */
const TruncateText = ({ text, maxLength })=> {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  } else {
    const truncatedText = text.slice(0, maxLength) + '...';
    return <span title={text}>{truncatedText}</span>;
  }
}

export default TruncateText;