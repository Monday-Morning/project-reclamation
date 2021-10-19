/**
 * @module app.schema.UserEnumTypes
 * @description User Enum Types
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.UserResolver
 *
 * @version v1
 * @since 0.1.0
 */

const { GraphQLEnumType } = require('../scalars');

module.exports = {
  /**
   * @description Verified Field Enumerator
   * @constant
   *
   * @type {GraphQLEnumType}
   */
  AccountTypeEnumType: new GraphQLEnumType({
    name: 'AccountTypeEnum',
    values: {
      NORMAL: { value: 0 },
      NITR_STUDENT: { value: 1 },
      MM_TEAM: { value: 2 },
      NITR_FACULTY: { value: 3 },
    },
  }),

  /**
   * @description Position Field Enumerator
   * @constant
   *
   * @type {GraphQLEnumType}
   */
  PositionEnumType: new GraphQLEnumType({
    name: 'PositionEnum',
    values: {
      MEMBER: { value: 0 },
      COORDINATOR: { value: 1 },
      MENTOR: { value: 2 },
    },
  }),

  /**
   * @description Team Field Enumerator
   * @constant
   *
   * @type {GraphQLEnumType}
   */
  TeamEnumType: new GraphQLEnumType({
    name: 'TeamEnum',
    values: {
      CONTENT: { value: 0 },
      PHOTO_FILMS: { value: 1 },
      DESIGN: { value: 2 },
      TECHNICAL: { value: 3 },
    },
  }),
};
