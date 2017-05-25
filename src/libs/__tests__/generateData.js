import { sortBy, uniqBy } from 'lodash/fp';
import generateData from '../generateData';

const validConfig = {
  count: 500,
  start: new Date(1980, 1, 1),
  end: new Date(1980, 1, 2),
};

const sortByTime = sortBy('timestamp');
const uniqById = uniqBy('id');

describe('generateData', () => {
  it('should be a function', () => {
    expect(typeof generateData).toBe('function');
  });

  it('should take a single config object argument', () => {
    expect(() => generateData({})).not.toThrow();
  });

  it('should not throw if not provided config', () => {
    expect(() => generateData(validConfig)).not.toThrow();
  });

  it('should return an array of objects', () => {
    const data = generateData();

    expect(typeof data[0]).toBe('object');
    expect(data[0]).not.toBe(null);
  });

  describe('returned objects', () => {
    it('should contain a `id` property of type `String` which is unique', () => {
      const data = generateData();

      expect(data[0].id.constructor).toBe(String);
      expect(data.length === uniqById(data).length).toBe(true);
    });

    it('should contain a `timestamp` property of type `Date`', () => {
      const data = generateData();

      expect(data[0].timestamp.constructor).toBe(Date);
    });

    it('should contain a `name` property of type `String`', () => {
      const data = generateData();

      expect(data[0].name.constructor).toBe(String);
    });
  });

  describe('default configuration', () => {
    it('should return 200 objects', () => {
      const data = generateData();

      expect(data.length).toBe(200);
    });

    it('should return timestamps between 29/05/1991 and now', () => {
      const data = generateData();
      const sortedData = sortByTime(data);

      expect(sortedData[0].timestamp > new Date(1991, 5, 29)).toBe(true);
      expect(sortedData[199].timestamp < new Date()).toBe(true);
    });
  });

  describe('config object arg', () => {
    it('should take a `count` property effecting the count of returned objects', () => {
      const data = generateData(validConfig);

      expect(data.length).toBe(validConfig.count);
    });

    it('should take a `start` property, effecting the earliest possible date', () => {
      const data = generateData(validConfig);
      const sortedData = sortByTime(data);

      expect(sortedData[0].timestamp > validConfig.start).toBe(true);
    });

    it('should take a `end` property, effecting the latest possible date', () => {
      const data = generateData(validConfig);
      const sortedData = sortByTime(data);

      expect(sortedData[199].timestamp < validConfig.end).toBe(true);
    });
  });
});
