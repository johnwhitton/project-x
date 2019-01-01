import {assert} from 'chai';
import CowriMath from '../math/CowriMath';

it('Test adding two floating point numbers together', () => {
  const float1 = 0.1;
  const float2 = 0.2;
  const expectedSum = 0.3;
  assert.equal(expectedSum, CowriMath.plus(float1, float2));
});

it('Test adding two integers together', () => {
  const int1 = 1;
  const int2 = 2;
  const expectedSum = 3;
  assert.equal(expectedSum, CowriMath.plus(int1, int2));
});

it('Test subtracting two floating point numbers', () => {
  const float1 = 0.2;
  const float2 = 0.1;
  const expectedDifference = 0.1;
  assert.equal(expectedDifference, CowriMath.minus(float1, float2));
});
