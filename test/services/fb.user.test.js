const assert = require('assert');
const app = require('../../src/app');
const factory = require('../factory/fb.user.factory.js');

let mongooseClient;

describe('\'fb.user\' service', function () {
  this.timeout(5000);

  before((done) => {
    mongooseClient = app.get('mongooseClient');
    done();
  });

  it('registered the service', function() {
    const service = app.service('fb-user');
    assert.ok(service, 'Registered the service');
  });

  it('creates a fb user', async () => {
    const service = app.service('fb-user');
    const args = factory.createNewFbUserArgs();
    const user = await service.create(args);

    {
      assert.equal(user._id, args._id);
      assert.equal(user.accessToken, args.accessToken);
      assert.equal(user.expiresIn, args.expiresIn);
      assert.equal(user.name, args.name);
      assert.equal(user.signedRequest, args.signedRequest);
      assert.equal(user.userId, args.userId);
    }
  });

  it('deletes a fb user', async () => {
    const service = app.service('fb-user');
    const args = factory.createNewFbUserArgs({ _id: '5bb0dbb2feaa8c0ff9a5586b' });
    const user = await service.create(args);

    {
      assert.equal(user._id, args._id);
      assert.equal(user.accessToken, args.accessToken);
      assert.equal(user.expiresIn, args.expiresIn);
      assert.equal(user.name, args.name);
      assert.equal(user.signedRequest, args.signedRequest);
      assert.equal(user.userId, args.userId);
    }
    {
      const removeResponse = await service.remove(user._id);
      assert.ok(removeResponse);
    }

  });

  afterEach((done) => {
    /** Removes every fb user record from the test db */
    mongooseClient.models.FbUser.remove({}, (err, res) => {
      console.log('\n');
      if (err) console.log('***** FB USER COLLECTION REMOVE ERROR *****');
      if (res) console.log('***** FB USER COLLECTION IS CLEARED *****');
      console.log('\n');
    })
    done();
  });

  after((done) => {
    /** Drops the test database after all tests finished */
    console.log('\n');
    console.log('***** TEST DATABASE IS DELETED *****');
    mongooseClient.connection.db.dropDatabase();
    console.log('\n');
    done()
  })
});
