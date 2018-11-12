import CowriMath from '../main/CowriMath';
import {assert} from 'chai';

it('Test adding two floating point numbers together', () => {
  let float1 = 0.1;
  let float2 = 0.2;
  let expectedSum = 0.3;
  assert.equal(expectedSum, CowriMath.plus(float1, float2));
});

it('Test adding two integers together', () => {
  let int1 = 1;
  let int2 = 2;
  let expectedSum = 3;
  assert.equal(expectedSum, CowriMath.plus(int1, int2));
});

it('Test subtracting two floating point numbers', () => {
  let float1 = 0.2;
  let float2 = 0.1;
  let expectedDifference = 0.1;
  assert.equal(expectedDifference, CowriMath.minus(float1, float2));
});
