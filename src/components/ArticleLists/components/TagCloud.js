import { useNavigate } from "react-router-dom";
import WordCloud from 'react-d3-cloud';

export function TagCloud({data}){
    const navigate = useNavigate();
    return (<WordCloud
      data={data}
      width={500}
      height={150}
      fontWeight="bold"
      fontSize={(word) => word.value * 10}
      spiral="rectangular"
      rotate={0}
      padding={5}
      random={Math.random}
     onWordClick={(event, d) => {
        const uri = "../tag/"+d.text
        navigate(uri);
      }}
      // onWordMouseOver={(event, d) => {
      //   console.log(`onWordMouseOver: ${d.text}`);
      // }}
      // onWordMouseOut={(event, d) => {
      //   console.log(`onWordMouseOut: ${d.text}`);
      // }}
    />)
  }