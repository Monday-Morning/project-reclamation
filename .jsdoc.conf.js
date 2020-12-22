/** Documentation Template for Module or Function */
/**
 * @deprecated - If module/method has been deprecated
 *
 * @name ModuleName
 * @description - To write the description of the module
 * @summary - If needed, to summarize the description
 * @module module/path/name - To denote the module with its parents
 * OR @mixin mixin/path/name
 * OE @method methodName
 * @package - if module is package private
 * @async - if function is asynchronous
 *
 * @param {typeName} - Type of paramter required
 * @return {typeName} - Type of return variable
 *
 * @this reference - To denote what this references
 * @throws {exceptionTypeName} - To denote what is thrown for an error
 *
 * @version 0.0.0 - To denote module version
 * @since - To denote app version when the module was added
 *
 * @todo - To document pending work
 *
 * @see module:path/name - To reference another module
 * {@link url|link text} - To link another part of documentation
 */

/** Documentation Template for Variable */
/**
 * @description - desciption, if needed, for the variable
 * @const - if variable is a const
 * @type {typeName}
 */

/** Description for item/function/module */
module.exports = {
  plugins: ['plugins/markdown'],
  recursiveDepth: 20,
  source: {
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\).',
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
