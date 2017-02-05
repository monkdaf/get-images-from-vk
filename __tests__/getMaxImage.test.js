// @flow

import getMaxImage from '../src/getMaxImage';

describe('Test for getMaxImage', () => {
  test('body is empty', () => {
    expect(getMaxImage().toString()).toBe({}.toString());
  });

  let itemImage = {
    id: 293278436,
    album_id: -7,
    owner_id: -38914662,
    user_id: 100,
    width: 1920,
    height: 1200,
    text: '',
    date: 1354969760,
    post_id: 14414,
  };
  let res = {};
  test('url\'s is empty', () => {
    expect(JSON.stringify(getMaxImage(itemImage))).toBe(JSON.stringify(res));
  });

  itemImage = {
    id: 293278436,
    album_id: -7,
    owner_id: -38914662,
    user_id: 100,
    photo_75: 'https://pp.vk.me/938/OHMMJ5ZGY4w.jpg',
    photo_130: 'https://pp.vk.me/939/3Pml3GZNt9w.jpg',
    photo_604: 'https://pp.vk.me/93a/ilPKUNtsNKc.jpg',
    photo_807: 'https://pp.vk.me/93b/En5QRTZjWpk.jpg',
    photo_1280: 'https://pp.vk.me/93c/9q51WyK8d84.jpg',
    photo_2560: 'https://pp.vk.me/93d/o2HqnNKJM3Y.jpg',
    width: 1920,
    height: 1200,
    text: '',
    date: 1354969760,
    post_id: 14414,
  };
  res = { name: '293278436.jpg', url: 'https://pp.vk.me/93d/o2HqnNKJM3Y.jpg' };
  test('body is have right tag', () => {
    expect(JSON.stringify(getMaxImage(itemImage))).toBe(JSON.stringify(res));
  });
});
