// const expect = require('chai').expect;
// const {
//   getUser,
//   listUsers,
//   searchUsers,
//   createUser,
//   updateUserName,
//   updateUserPicture,
//   updateUserTopics,
//   updateUserBio,
//   addNITRMail,
//   verifyNITRMail,
//   newsletterSubscription,
//   setUserVerfiedStatus,
//   setUserBan,
// } = require('../../server/schema/user/user.resolver');

// const UserModelMock = {
//   staticData: {
//     someUser: {
//       id: 'some-user',
//       firstName: 'John',
//       lastName: 'Doe',
//       picture: 'some-pic-id',
//       accountType: 0,
//       contributions: null,
//     },
//     someAuthor: {
//       id: 'some-author',
//       firstName: 'Jane',
//       lastName: 'Doe',
//       picture: 'some-author-pic-id',
//       accountType: 2,
//       contributions: [
//         { model: 'Article', reference: 'some-article-id' },
//         { model: 'Media', reference: 'some-media-id' },
//       ],
//     },
//     someOtherAuthor: {
//       id: 'some-other-author',
//       firstName: 'Andrew',
//       lastName: 'Murphy',
//       picture: 'some-other-author-pic-id',
//       accountType: 2,
//       contributions: [
//         { model: 'Article', reference: 'some-article-id' },
//         { model: 'Media', reference: 'some-media-id' },
//       ],
//     },
//   },
//   findOne: (params, fields, options) => {
//     if (params.id === 'some-user') {
//       return UserModelMock.staticData.someUser;
//     } else if (params.id === 'some-author') {
//       return UserModelMock.staticData.someAuthor;
//     } else if (params.id === 'some-other-author') {
//       return UserModelMock.staticData.someOtherAuthor;
//     } else {
//       return null;
//     }
//   },
// };

// describe('User Resolver Module', async () => {
//   describe('getUser Function', async () => {
//     // case: does not provide required arguments
//     it('Returns BAD_REQUEST error if the user does not provide required arguments', async () => {
//       const _response = await getUser(
//         null,
//         {},
//         {},
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
//         UserModelMock
//       );

//       expect(_response.name).to.be.equal('GraphQLError');
//       expect(_response.message).to.be.equal('BAD_REQUEST');
//     });

//     // case: does not have permission to read
//     // it('Returns FORBIDDEN error if the user does not have permission to read', async () => {
//     //   const _response = await getUser(
//     //     null,
//     //     { id: 'some-user' },
//     //     {},
//     //     { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
//     //     UserModelMock
//     //   );

//     //   expect(_response.name).to.be.equal('GraphQLError');
//     //   expect(_response.message).to.be.equal('FORBIDDEN');
//     // });

//     // case: does not have permission for particular field -> use info.fieldNodes
//     // only name and pic is public for accTyp 0
//     it('Returns FORBIDDEN error if the user does not have permission to read a particular field', async () => {
//       const _response = await getUser(
//         null,
//         { id: 'some-user' },
//         { decodedToken: { customClaims: { roles: ['user.basic'] } } },
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//         UserModelMock
//       );

//       expect(_response.name).to.be.equal('GraphQLError');
//       expect(_response.message).to.be.equal('FORBIDDEN');
//     });

//     // case: user does not exist
//     it('Returns NOT FOUND error if the user does not exist', async () => {
//       const _response = await getUser(
//         null,
//         { id: 'some-non-existant-id' },
//         { decodedToken: { customClaims: { roles: ['user.basic'] } } },
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
//         UserModelMock
//       );

//       expect(_response.name).to.be.equal('GraphQLError');
//       expect(_response.message).to.be.equal('NOT_FOUND');
//     });

//     // case: all works
//     it('Returns User object if successful with user.read.public permission', async () => {
//       const _response = await getUser(
//         null,
//         { id: 'some-user' },
//         { decodedToken: { customClaims: { roles: ['user.basic'] } } },
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
//         UserModelMock
//       );

//       let expectedData = UserModelMock.staticData.someUser;
//       delete expectedData.contributions;

//       expect(_response).to.deep.equal(expectedData);
//     });

//     // it('Returns User object if successful with user.read.private permission', async () => {
//     //   const _response = await getUser(
//     //     null,
//     //     { id: 'some-user' },
//     //     { decodedToken: { customClaims: { roles: ['user.verified'] } } },
//     //     { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//     //     UserModelMock
//     //   );

//     //   expect(_response).to.deep.equal(UserModelMock.staticData.someUser);
//     // });

//     it('Returns User object if account type is > 0', async () => {
//       const _response = await getUser(
//         null,
//         { id: 'some-author' },
//         {},
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//         UserModelMock
//       );

//       expect(_response).to.deep.equal(UserModelMock.staticData.someAuthor);
//     });
//   });

//   describe('listUsers Function', async () => {
//     // case: does not have required arguments
//     it('Returns BAD_REQUEST error if the arguments list is empty', async () => {
//       const _response = await listUsers(
//         null,
//         { ids: [], email: [] },
//         {},
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//         UserModelMock
//       );

//       expect(_response.name).to.be.equal('GraphQLError');
//       expect(_response.message).to.be.equal('BAD_REQUEST');
//     });

//     // case: does not have list all permission
//     it('Returns FORBIDDEN error if user does not have permission', async () => {
//       const _response = await listUsers(
//         null,
//         { ids: ['some-user', 'some-non-existant-author'], email: [] },
//         {},
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//         UserModelMock
//       );

//       expect(_response.name).to.be.equal('GraphQLError');
//       expect(_response.message).to.be.equal('FORBIDDEN');
//     });

//     // case: empty set
//     // it('Returns NOT_FOUND error if no users found', async () => {
//     //   const _response = await listUsers(
//     //     null,
//     //     { ids: ['some-non-existant-user', 'some-non-existant-author'], email: [] },
//     //     { decodedToken: { customClaims: { roles: ['user.admin'] } } },
//     //     { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//     //     {
//     //       ...UserModelMock,
//     //       findMany: (params, fields, options) => {
//     //         if (params.id instanceof Array) {
//     //           let _users = [];
//     //           if (params.id.includes('some-user')) _users.push(UserModelMock.staticData.someUser);
//     //           if (params.id.includes('some-author')) _users.push(UserModelMock.staticData.someAuthor);
//     //           if (params.id.includes('some-other-author')) _users.push(UserModelMock.staticData.someOtherAuthor);
//     //           let _res = {
//     //             skip: (_) => {
//     //               return {
//     //                 limit: (_) => _users,
//     //               };
//     //             },
//     //           };
//     //           return _res;
//     //         } else {
//     //           throw 400;
//     //         }
//     //       },
//     //     }
//     //   );

//     //   expect(_response.name).to.be.equal('GraphQLError');
//     //   expect(_response.message).to.be.equal('NOT_FOUND');
//     // });

//     // case: all works
//     // it('Returns user details if users found', async () => {
//     //   const _response = await listUsers(
//     //     null,
//     //     { ids: ['some-user', 'some-author', 'some-other-author'], email: [] },
//     //     { decodedToken: { customClaims: { roles: ['user.admin'] } } },
//     //     { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//     //     {
//     //       ...UserModelMock,
//     //       findMany: (params, fields, options) => {
//     //         if (params.id instanceof Array) {
//     //           let _users = [];
//     //           if (params.id.includes('some-user')) _users.push(UserModelMock.staticData.someUser);
//     //           if (params.id.includes('some-author')) _users.push(UserModelMock.staticData.someAuthor);
//     //           if (params.id.includes('some-other-author')) _users.push(UserModelMock.staticData.someOtherAuthor);
//     //           let _res = {
//     //             skip: (_) => {
//     //               return {
//     //                 limit: (_) => _users,
//     //               };
//     //             },
//     //           };
//     //           return _res;
//     //         } else {
//     //           throw 400;
//     //         }
//     //       },
//     //     }
//     //   );

//     //   expect(_response).to.deep.equal([
//     //     { ...UserModelMock.staticData.someUser },
//     //     { ...UserModelMock.staticData.someAuthor },
//     //     { ...UserModelMock.staticData.someOtherAuthor },
//     //   ]);
//     // });
//   });

//   describe('searchUsers Function', async () => {
//     // case: does not have required arguments
//     it('Returns BAD_REQUEST error if arguments are empty', async () => {
//       const _response = await searchUsers(
//         null,
//         {},
//         {},
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//         UserModelMock
//       );

//       expect(_response.name).to.be.equal('GraphQLError');
//       expect(_response.message).to.be.equal('BAD_REQUEST');
//     });
//     // case: does not have permission to search
//     it('Returns FORBIDDEN error if user does not have permission to search', async () => {
//       const _response = await searchUsers(
//         null,
//         { keywords: 'j doe' },
//         {},
//         { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
//         UserModelMock
//       );
//     });

//     // case: does not have permission for particular field -> use info.fieldNodes
//     // case: does not have permission for all users - only show accType > 0
//     // case: empty set
//     // case: all works
//   });

//   describe('createUser Function', () => {
//     // case: user does not exist in firebase
//     // case: user already exists in database
//     // case: all works
//   });

//   describe('updateUserName Function', () => {
//     // case: does not have permission to change (not self)
//     // case: user does not exist
//     // case: cannot change any more (changed once or nitr verified)
//     // case: propagation failed
//     // case: all works
//   });

//   describe('updateUserPicture Function', () => {
//     // case: does not have permission to change (not self)
//     // case: user does not exist
//     // case: image not found on cloudinary
//     // case: propagation failed
//     // case: all works
//   });

//   describe('updateUserTopics Function', () => {
//     // case: does not have permission to change (not self)
//     // case: user does not exist
//     // case: all works
//   });

//   describe('updateUserBio Function', () => {
//     // case: does not have permission to change (not self)
//     // case: user does not exist
//     // case: all works
//   });

//   describe('addNITRMail Function', () => {
//     // case: does not have permission to change (not self)
//     // case: already has nitr mail registered
//     // case: invalid mail
//     // case: all works
//   });

//   describe('verifyNITRMail Function', () => {
//     // case: invalid user id
//     // case: invalid token
//     // case: incorrect email id
//     // case: all works
//   });

//   describe('newsletterSubscription Function', () => {
//     // case: does not have permission to change (not self)
//     // case: all works
//   });

//   describe('setUserVerfiedStatus Function', () => {
//     // case: does not have permission to change (not admin)
//     // case: set to 0 - should delete nitr mail and position (if any)
//     // case: set to 1 - should add nitr mail
//     // case: set to 2 - should add nitr mail and position
//     // case: set to 3 - should add nitr mail
//     // case: all works
//   });

//   describe('setUserBan Function', () => {
//     // case: does not have permission to change (not admin)
//     // case: all works
//   });
// });
