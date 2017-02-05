#!/usr/bin/env node
// @flow

import debug from 'debug';

const getMaxImageLog = debug('getMaxImage');

/**
 * Get url with max size
 * @param {object} itemInfo Input item data
 * @returns {name: string, url: string} Return object with property of image
 */
const getMaxImage = (itemInfo:Object): {name: string, url: string} => {
  getMaxImageLog('Start');
  if (!itemInfo) {
    getMaxImageLog('param "itemInfo" is empty');
    return {};
  }
  let url;
  if (itemInfo.photo_2560) {
    url = itemInfo.photo_2560;
  } else if (itemInfo.photo_1280) {
    url = itemInfo.photo_1280;
  } else if (itemInfo.photo_807) {
    url = itemInfo.photo_807;
  } else if (itemInfo.photo_604) {
    url = itemInfo.photo_604;
  } else if (itemInfo.photo_130) {
    url = itemInfo.photo_130;
  } else if (itemInfo.photo_75) {
    url = itemInfo.photo_75;
  } else {
    getMaxImageLog('no url in item (id-%s)', itemInfo.id);
    return {};
  }
  const extention = url.split('.').pop();
  const name = `${itemInfo.id}.${extention}`;
  return { name, url };
};

export default getMaxImage;
