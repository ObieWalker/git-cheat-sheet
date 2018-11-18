import faker from 'faker';
/**
 *
 *
 * @class TestHelper
 */
class TestHelper {
  /**
   * Creates an instance of TestHelper.
   * @memberof TestHelper
   */
  constructor() {
    this.userToken = undefined;
    this.adminToken = undefined;
    this.userEmail = 'randomEmail@gmail.com';
    this.adminEmail = 'adminuser@gmail.com';
    this.userPassword = 'password';
    this.adminPassword = 'password';
    this.wrongPassword = `${faker.random.word()}`;
    this.wrongToken = `${faker.random.words()}`;
    this.wrongEmail = `${faker.internet.email()}`;
    this.centerName = faker.random.words();
    this.stringId = 'stringValue';
  }
  /**
   * @returns {*} null
   *
   * @param {any} userToken
   * @memberof TestHelper
   */
  setUserToken(userToken) {
    this.userToken = userToken;
  }
  /**
   * @returns {*} null
   *
   * @param {any} adminToken
   * @memberof TestHelper
   */
  setAdminToken(adminToken) {
    this.adminToken = adminToken;
  }
  /**
   * @returns {*} null
   *
   * @param {any} centerId
   * @memberof TestHelper
   */
  setCenterId(centerId) {
    this.centerId = centerId;
  }
  /**
   * @returns {*} null
   *
   * @param {any} eventId
   * @memberof TestHelper
   */
  setEventId(eventId) {
    this.eventId = eventId;
  }
}

export default new TestHelper();
