const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  //   GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const MetaDataType = new GraphQLObjectType({
  name: 'MetaData',
  fields: () => ({
    lastSignInTime: { type: GraphQLString },
    creationTime: { type: GraphQLString },
    lastRefreshTime: { type: GraphQLString },
  }),
});

const CustomClaimsType = new GraphQLObjectType({
  name: 'CustomClaims',
  fields: () => ({
    mid: { type: GraphQLID },
    roles: { type: GraphQLList(GraphQLString) },
  }),
});

const FirebaseUserType = new GraphQLObjectType({
  name: 'FirebaseUser',
  fields: () => ({
    uid: { type: GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean },
    displayName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    disabled: { type: GraphQLBoolean },
    metadata: { type: MetaDataType },
    customClaims: { type: CustomClaimsType },
  }),
});

/**
 * @description Firebase User Type
 * @constant FirebaseUserType
 *
 * @type {GraphQLObjectType}
 */
module.exports = FirebaseUserType;
