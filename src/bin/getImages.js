#!/usr/bin/env node
// @flow

// import fetch from 'node-fetch';
import debug from 'debug';
// import fs from 'fs';
import getListImages from '../getListImages';
// import downloadAllImages from '../downloadAllImages';
import downloadImages from '../downloadImages';
// import VKApi from 'node-vkapi';
// import getMaxImage from '../getMaxImage';
//
// const VK = new VKApi({
//   app: {
//     id: 5773833,
//     secret: 'stL21yNZsudIIYwWtPcH',
//   },
//   // auth: {
//   //   login: '4daf4all@ukr.net',
//   //   pass: 'lathem13',
//   // },
// });

const idGroup = process.argv[2];
const offset = 0;
// const path = process.argv[3];

const getImagesLog = debug('getImages');
const errorLog = debug('error');

getImagesLog('Start');
getListImages(idGroup, offset, [])
// VK.auth.user({
//   scope: ['audio', 'photos', 'friends', 'wall', 'offline']
// }).then((token) => {
  // return VK.call('photos.get', {
// VK.call('photos.get', {
//   owner_id: idGroup,
//   album_id: 'wall',
//   offset: 0,
//   count: 2,
// })
.then((list) => {
  getImagesLog('Total count of images : %s', list.length);
  if (list.count === 0) {
    throw new Error('No iages');
  }
  // getImagesLog('first image is %s', list[0].name);
  // downloadAllImages(list);
  downloadImages(list, 400);
  // return JSON.stringify(res, null, ' ');
  // return getMaxImage(res.items[0]);
})

// .then((json) => {
//   fs.writeFile('temp/list.json', json, (err) => {
//     if (err) throw err;
//     getImagesLog('list.json is saved!');
//   });
// })

.catch((error) => {
  errorLog('Error: %s', error);
  // console.log(error);
});
