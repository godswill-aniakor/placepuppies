process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Placeholder', () => {
    beforeEach((done) => {
        done();
    });

    describe('/GET placeholder', () => {
        it('it should GET a random placeholder', (done) => {
            chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET placeholder', () => {
        it('it should GET a random placeholder with width and height', (done) => {
            chai.request(app)
            .get('/500/500')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe('/GET placeholder', () => {
        it('it should GET a random placeholder with invalid width', (done) => {
            chai.request(app)
            .get('/5000/500')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });

    describe('/GET placeholder', () => {
        it('it should GET a random placeholder with invalid height', (done) => {
            chai.request(app)
            .get('/500/5000')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });
});