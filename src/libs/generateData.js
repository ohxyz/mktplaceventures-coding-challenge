import { merge } from 'lodash';
import { compose, map } from 'lodash/fp';
import { commerce } from 'faker';
import shortid from 'shortid';

const defaultConfig = {
  count: 200,
  end: new Date(),
  start: new Date(1991, 5, 29),
};

export function dateBetween(start, end) {
  return () =>
    new Date(start.getTime() + (Math.random() * (end.getTime() - start.getTime())));
}

export function generateItem(timestamp) {
  return {
    timestamp,
    id: shortid(),
    name: commerce.productName(),
  };
}

/**
 * Generates an array of objects containing a timestamp and description
 * @export
 * @param {any} [config={}] An optional configuration object
 * @param {Number} [config.count=200] The amount of items in the returned array
 * @param {Date} [config.start=200] The earliest possible returned date
 * @param {Date} [config.end=200] The latest possible returned date
 * @returns {[Object]} Containing a `timestamp` {Date} and `description` {String} prop
 */
export default function (config = {}) {
  const { count, end, start } = merge({}, defaultConfig, config);

  const genDate = dateBetween(start, end);
  const genDates = map(genDate);
  const genItems = map(generateItem);

  return compose(genItems, genDates)(Array(count));
}
