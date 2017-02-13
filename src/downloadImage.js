#!/usr/bin/env node
// @flow

import fetch from 'node-fetch';
import debug from 'debug';
import fs from 'fs';

const downloadImageLog = debug('downloadImage');
const errorLog = debug('error');

/**
 * Download image from url
 * @param {string} name  image's name
 * @param {string} url  image's url
 */

const downloadImage = (name: string, url: string) => {
  downloadImageLog('Start with url: %s', url);
  const arrUrl = url.split('/');
  const encodedName = encodeURIComponent(arrUrl.pop());
  const encodedUrl = `${arrUrl.join('/')}/${encodedName}`;
  // downloadImageLog('Start with encodedUrl: %s', encodedUrl);
  return new Promise((resolve, reject) => {
    fetch(encodedUrl)
    .then((res) => {
      const dest = fs.createWriteStream(`outImages/${name}`);
      res.body.pipe(dest);
      // dest.end();
      downloadImageLog(`${name} is saved!`);
      resolve(`${name} is saved!`);
    })
    .catch((err) => {
      errorLog('Error is %s', err);
      // console.error(err);
      reject(err);
    });
  });
};

export default downloadImage;
