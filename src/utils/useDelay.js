/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const useDelay = (origProp, delay) => {
  const [prop, setProp] = useState(origProp);
  const [delayedProp, setDelayedProp] = useState(origProp);

  const delayToUse = delay || 500;

  useEffect(() => {
    setTimeout(() => { setDelayedProp(prop); }, delayToUse);
  }, [prop]);

  return [prop, setProp, delayedProp, setDelayedProp];
};

export default useDelay;
