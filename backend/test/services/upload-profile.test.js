const assert = require('assert');
const app = require('../../src/app');

describe('\'upload-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload-profile');

    assert.ok(service, 'Registered the service');
  });
});
