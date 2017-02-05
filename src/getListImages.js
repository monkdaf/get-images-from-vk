#!/usr/bin/env node
// @flow

import debug from 'debug';
import VKApi from 'node-vkapi';
import getMaxImage from './getMaxImage';

const VK = new VKApi({
  app: {
    id: 5773833,
    secret: 'stL21yNZsudIIYwWtPcH',
  },
});

const getListImagesLog = debug('getListImages');
const errorLog = debug('error');

/**
 * Get list images from group VK
 * @param {number} idGroup idGroup
 * @param {number} offset offset
 * @param {Array} accList accumulator
 * @returns {Array} Return list of images
 */
const getListImages =
(idGroup: number,
  offset: number,
  // totalCount: number,
  accList: [{name: string, url: string}]): [{name: string, url: string}] => {
  getListImagesLog('Start');
  return new Promise((resolve, reject) => {
    if (!idGroup || idGroup === 0) {
      getListImagesLog('param "idGroup" is empty or wrong');
      throw new Error('GroupID is empty or wrong');
      // return [];
    }
    VK.call('photos.get', {
      owner_id: idGroup,
      album_id: 'wall',
      offset,
      count: 1000,
    })
    .then((res) => {
      getListImagesLog('Total count of images : %s', res.count);
      getListImagesLog('res.items.length : %s', res.items.length);
      if (res.count === 0) {
        throw new Error('Group does not exist');
      }
      if (res.items.length === 0) {
        getListImagesLog('resolve');
        resolve(accList);
        return accList;
      }
      const listMaxImages = res.items.map(item => getMaxImage(item));
      const newOffset = offset + 1000;
      getListImagesLog('go to offset %s', newOffset);
      return getListImages(idGroup, newOffset, accList.concat(listMaxImages));
    })
    .then((list) => {
      getListImagesLog('commonlist is %s', JSON.stringify(list.length, null, ' '));
      resolve(list);
      // return list;
    })
    .catch((err) => {
      errorLog('Error is %s', err);
      // console.error(err);
      reject(err);
    });
    return [];
  });
};

export default getListImages;
// getListImages
