#!/usr/bin/env node
// @flow

import fs from 'fs';
import debug from 'debug';

import getListImages from '../getListImages';
import downloadImages from '../downloadImages';


const idGroup = process.argv[2];
const offset = 0;

const getImagesLog = debug('getImages');
const errorLog = debug('error');


fs.access('outImages', fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdirSync('outImages');
  }
});

getImagesLog('Start');
getListImages(idGroup, offset, [])
.then((list) => {
  getImagesLog('Total count of images : %s', list.length);
  if (list.count === 0) {
    throw new Error('No iages');
  }
  downloadImages(list, 400);
})
.catch((error) => {
  errorLog('Error: %s', error);
  // console.log(error);
});
