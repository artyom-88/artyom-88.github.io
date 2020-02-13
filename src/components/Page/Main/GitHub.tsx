import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../Navigation/LoadingIndicator';
import './GitHub.scss';

const PROXY = 'https://urlreq.appspot.com/req?method=GET&url=';
const CONTR = 'https://github.com/users/Artyom-Ganev/contributions';
const svgRef = React.createRef<HTMLDivElement>();

/**
 * Load GitHub contribution hook
 */
const useContribution = () => {
  const [contribution, setContribution] = useState<string>('');
  useEffect(() => {
    let cancel = false;
    if (!contribution) {
      (async () => {
        const { data }: AxiosResponse<string> = await axios.get(`${PROXY}${CONTR}`);
        if (!cancel) {
          setContribution(data);
        }
      })();
    }
    return () => {
      cancel = true;
    };
  });
  return contribution;
};

/**
 * Github contributions chart component
 */
const GitHub = () => {
  const data = useContribution();
  if (svgRef.current) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = data;
    const contribution = wrapper.querySelector('svg.js-calendar-graph-svg');
    svgRef.current.innerHTML = contribution ? contribution.outerHTML : '';
  }
  return (
    <div className='flexBox justifyContentCenter page-main__githubContainer'>
      <div ref={svgRef} className='page-main__githubContributions' />
      {!svgRef.current && <LoadingIndicator />}
    </div>
  );
};

export default GitHub;
