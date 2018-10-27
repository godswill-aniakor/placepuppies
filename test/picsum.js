process.env.NODE_ENV = 'test';

const assert = require('assert');
const rimraf = require('rimraf');
const picsum = require('../service/picsum');

describe('Picsum', () => {
    beforeEach((done) => {
        rimraf(picsum.cacheDir, () => picsum.initialize(() => done()));
    });

    describe('Picsum', () => {
        it('it should add an image to store', (done) => {
            const size = picsum.size();

            picsum.addImage('test.png');
            assert.notEqual(size, picsum.size());
            done();
        });
    });

    describe('Picsum', () => {
        it('it should add an invalid image to store', (done) => {
            const size = picsum.size();

            picsum.addImage('test.txt');
            assert.equal(size, picsum.size());
            done();
        });
    });

    after((done) => {
        rimraf(picsum.cacheDir, () => done());
    });
});