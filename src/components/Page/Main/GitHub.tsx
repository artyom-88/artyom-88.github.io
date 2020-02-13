import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../Navigation/LoadingIndicator';
import './GitHub.scss';

const PROXY = 'https://urlreq.appspot.com/req?method=GET&url=';
const CONTR = 'https://github.com/users/Artyom-Ganev/contributions';
const svgRef = React.createRef<HTMLDivElement>();

/**
 * Load GitHub contribution request
 * @param {Function} update update function
 */
const loadData = (update: (data: string) => void) => {
  axios
    .get(`${PROXY}${CONTR}`)
    .then(({ data }: AxiosResponse<string>) => {
      update(data);
    })
    .catch(() => {
      update('');
    });
};

/**
 * Load GitHub contribution hook
 */
const useContribution = () => {
  const [contribution, setContribution] = useState<string>('');
  useEffect(() => {
    if (contribution) {
      return;
    }
    let needUpdate = true;
    loadData((data) => {
      if (needUpdate) {
        setContribution(data);
      }
    });
    return () => {
      // useEffect was cancelled
      needUpdate = false;
    };
  });
  return contribution;
};

/**
 * Github contributions chart component
 */
const GitHub = () => {
  const contribution = useContribution();
  if (svgRef.current) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = contribution;
    // extracting svg graph
    const svg = wrapper.querySelector('svg.js-calendar-graph-svg');
    svgRef.current.innerHTML = svg ? svg.outerHTML : '';
  }
  return (
    <div className='flexBox justifyContentCenter page-main__githubContainer'>
      <div ref={svgRef} className='page-main__githubContributions' />
      {!svgRef.current && <LoadingIndicator />}
    </div>
  );
};

export default GitHub;
