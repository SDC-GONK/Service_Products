import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 1000 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95) < 2000'],
    'http_req_failed': ['rate<0.01'],
  }
};

export default function k6Test() {
  group('GET products', () => {
    const getProducts = http.get('http://127.0.0.1:3000/products');
    check(getProducts, {
      'response code was 200': (getProducts) => getProducts.status === 200,
      // 'duration < 2000ms check': (response) => response.timing.duration < 2000,
    });
    sleep(1);
  });

  group('GET product info', () => {
    const productId = Math.floor(Math.random() * 1000011);
    const getProductInfo = http.get(`http://127.0.0.1:3000/products/${productId}`);
    check(getProductInfo, {
      'response code was 200': (getProductInfo) => getProductInfo.status === 200,
    });
    sleep(1);
  });

  group('GET product styles', () => {
    const productId = Math.floor(Math.random() * 1000011);
    const getProductStyles = http.get(`http://127.0.0.1:3000/products/${productId}/styles`);
    check(getProductStyles, {
      'response code was 200': (getProductStyles) => getProductStyles.status === 200,
    });
    sleep(1);
  });

  group('GET related products', () => {
    const productId = Math.floor(Math.random() * 1000011);
    const getRelatedProducts = http.get(`http://127.0.0.1:3000/products/${productId}/related`);
    check(getRelatedProducts, {
      'response code was 200': (getRelatedProducts) => getRelatedProducts.status === 200,
    });
    sleep(1);
  });
};
