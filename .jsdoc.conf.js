/** Documentation Template for Module */
/**
 * @deprecated - If module has been deprecated
 *
 * @module module.path.name - To denote the module with its parents
 * @description - To write the description of the module
 * @summary - If needed, to summarize the description
 *
 * @todo - To document pending work
 *
 * @requires packageName - To denote required package
 *
 * @see module:path.name - To reference another module
 * {@link url|link text} - To link another part of documentation
 *
 * @version 0.0.0 - To denote module version
 * @since - To denote app version when the module was added
 */

/** Documentation Template for Function */
/**
 * @deprecated - If module/method has been deprecated
 *
 * @function methodName - To denote the module with its parents
 * @description - To write the description of the module
 * @summary - If needed, to summarize the description
 * @private - if module is local to file
 * @package - if module is exported
 * @async - if function is asynchronous
 *
 * @param {typeName} - Type of paramter required
 *
 * @return {typeName} - Type of return variable
 *
 * @this reference - To denote what this references
 * @throws {exceptionTypeName} - To denote what is thrown for an error
 *
 * @todo - To document pending work
 *
 * @see module:path.name - To reference parent module
 * @see {@link path|link text} - To link another part of documentation
 *
 * @version 0.0.0 - To denote module version
 * @since - To denote app version when the module was added
 */

/** Documentation Template for Variable */
/**
 * @summary - summary, if needed, for the variable
 * @description - desciption, if needed, for the variable
 * @const name - if variable is a const
 *
 * @global - if it is an environment variable
 * @type {typeName} - if variable is not an object
 * @default value - if default value exists
 *
 * @see module:path.name - if object of module
 */

/** Description for item/function/module */
module.exports = {
  plugins: ['plugins/markdown'],
  recursiveDepth: 20,
  source: {
    exclude: ['node_module', '.gitsecret', '.git', 'test', 'server/node_modules'],
    include: ['server/.env_sample.js'],
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\)_',
  },
  sourceType: 'module',
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc'],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
};
