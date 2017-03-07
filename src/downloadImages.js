#!/usr/bin/env node
// @flow

import debug from 'debug';
import downloadImage from './downloadImage';

const downloadImagesLog = debug('downloadImages');
// const errorLog = debug('error');

/**
 * Download images from list.
 * @param {Array} list  Array of object with list of products
 * @returns {Array} Return array of object with list of images
 */

const downloadImages = (list: [{name: string, url: string}], interval = 400) => {
  downloadImagesLog('Start');
  if (!list || list === []) {
    downloadImagesLog('List images is empty');
  }
  const totalLength = list.length;
  let pointer = totalLength;
  setTimeout(function run() {
    pointer -= 1;
    if (pointer < 0) return;
    // console.log(pointer)
    downloadImagesLog(`Download image ${list[pointer].name} (${pointer + 1} from ${totalLength})`);
    downloadImage(list[pointer].name, list[pointer].url);
    setTimeout(run, interval);
  }, interval);
};

export default downloadImages;
