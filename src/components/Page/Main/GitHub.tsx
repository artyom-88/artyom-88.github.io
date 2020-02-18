import axios, { AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LoadingIndicator from '../../Navigation/LoadingIndicator';
import './GitHub.scss';

const PROXY = 'https://urlreq.appspot.com/req?method=GET&url=';
const CONTR = 'https://github.com/users/Artyom-Ganev/contributions';
const svgRef = React.createRef<HTMLDivElement>();

/**
 * Load GitHub contribution request
 * @param {Function} update function
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
 * Load GitHub contribution data hook
 */
const contributionEffectWrapper = (contribution: string, setContribution: Dispatch<SetStateAction<string>>) => {
  if (contribution) {
    return;
  }

  let needUpdate = true;
  const updater = (data: string) => {
    if (needUpdate) {
      setContribution(data);
    }
  };
  loadData(updater);

  return () => {
    // useEffect was cancelled
    needUpdate = false;
  };
};

/**
 * Extract Svg Element from contribution data
 * @param {String} contribution data
 * @return {HTMLDivElement} Svg Element
 */
const extractSvg = (contribution: string) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = contribution;
  const svg = wrapper.querySelector<HTMLDivElement>('svg.js-calendar-graph-svg');
  if (svgRef.current) {
    svgRef.current.innerHTML = svg ? svg.outerHTML : '';
  }
};

/**
 * Github contributions chart component
 */
const GitHub = () => {
  const [contribution, setContribution] = useState<string>('');
  useEffect(() => contributionEffectWrapper(contribution, setContribution), [contribution]);
  useEffect(() => extractSvg(contribution), [contribution]);
  return (
    <div className='flexBox justifyContentCenter page-main__githubContainer'>
      <div ref={svgRef} className='page-main__githubContributions' />
      {!svgRef.current && <LoadingIndicator />}
    </div>
  );
};

export default GitHub;
