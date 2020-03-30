import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { LoadingIndicator } from 'src/components/Navigation';
import styles from './GitHub.module.scss';

const PROXY = 'https://urlreq.appspot.com/req?method=GET&url=';
const CONTR = 'https://github.com/users/Artyom-Ganev/contributions';
const svgRef = React.createRef<HTMLDivElement>();

/**
 * Load GitHub contribution request
 * @param {Function} update function
 */
const loadData = (update: (data: string) => void): void => {
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
const contributionEffectWrapper = (
  contribution: string,
  setContribution: Dispatch<SetStateAction<string>>
): void | (() => void) => {
  if (contribution) {
    return;
  }

  let needUpdate = true;
  const updater = (data: string): void => {
    if (needUpdate) {
      setContribution(data);
    }
  };
  loadData(updater);

  return (): void => {
    // useEffect was cancelled
    needUpdate = false;
  };
};

/**
 * Extract Svg Element from contribution data
 * @param {String} contribution data
 * @return {HTMLDivElement} Svg Element
 */
const extractSvg = (contribution: string): void => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = contribution;
  const svgContainer = wrapper.querySelector<HTMLDivElement>('.js-calendar-graph');
  if (svgRef.current) {
    svgRef.current.innerHTML = svgContainer ? svgContainer.innerHTML : '';
  }
};

/**
 * Github contributions chart component
 */
const GitHub: FunctionComponent = () => {
  const [contribution, setContribution] = useState<string>('');
  useEffect(() => contributionEffectWrapper(contribution, setContribution), [contribution]);
  useEffect(() => extractSvg(contribution), [contribution]);
  return (
    <div className={`flexBox justifyContentCenter ${styles.container}`}>
      <div ref={svgRef} className={styles.contributions} />
      {!svgRef.current && <LoadingIndicator />}
    </div>
  );
};

export default GitHub;
