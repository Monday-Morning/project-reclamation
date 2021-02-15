## Modules

<dl>
<dt><a href="#module_app">app</a></dt>
<dd><p>The Node.js Application for Monday Morning's Project Infinity, codenamed Project Reclamation</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#NODE_ENV">NODE_ENV</a> : <code>String</code></dt>
<dd><p>Node environment mode</p></dd>
<dt><a href="#PORT">PORT</a> : <code>Number</code></dt>
<dd><p>Server port</p></dd>
<dt><a href="#SESSION_SECRET">SESSION_SECRET</a> : <code>String</code></dt>
<dd><p>MongoDB store's session secret</p></dd>
<dt><a href="#SESSION_KEY">SESSION_KEY</a> : <code>String</code></dt>
<dd><p>MongoDB store's session key</p></dd>
<dt><a href="#MONGO_SESSION_URL">MONGO_SESSION_URL</a> : <code>String</code></dt>
<dd><p>MongoDB session table access URL</p></dd>
<dt><a href="#MONGO_APP_URL">MONGO_APP_URL</a> : <code>String</code></dt>
<dd><p>MongoDB app table access URL</p></dd>
<dt><a href="#GCP_STORAGE_BUCKET">GCP_STORAGE_BUCKET</a> : <code>String</code></dt>
<dd><p>GCP storage bucket address</p></dd>
<dt><a href="#TEST_AUTH_KEY">TEST_AUTH_KEY</a> : <code>String</code></dt>
<dd><p>Test JWT token for auth bypass</p></dd>
</dl>

<a name="module_app"></a>

## app

<p>The Node.js Application for Monday Morning's Project Infinity, codenamed Project Reclamation</p>

**Requires**: <code>module:express</code>, <code>module:express-session</code>, <code>module:connect-mongodb-session</code>, <code>module:apollo-server-session</code>, <code>module:cookie-parser</code>, <code>module:csurf</code>, <code>module:cors</code>, <code>module:errorhandler</code>, <code>module:app.router</code>, <code>module:app.mongoose</code>, <code>module:app.firebase</code>, <code>module:app.winston</code>  
**Since**: 0.1.0  
**Version**: 0.1.0

- [app](#module_app)
  - [module.exports](#exp_module_app--module.exports) : <code>Express.Express</code> ⏏
    - [~router](#module_app--module.exports..router) : <code>Express.Router</code>
    - [~app](#module_app--module.exports..app) : <code>Express.Express</code>
    - [~PORT](#module_app--module.exports..PORT) : <code>Number</code>
    - [~CORS_OPTIONS](#module_app--module.exports..CORS_OPTIONS) : <code>String</code>
    - [~store](#module_app--module.exports..store) : <code>MongoDBStore</code>
    - [~apolloServer](#module_app--module.exports..apolloServer) : <code>ApolloServer</code>

<a name="exp_module_app--module.exports"></a>

### module.exports : <code>Express.Express</code> ⏏

<p>Main Express Application</p>

**Kind**: Exported member  
<a name="module_app--module.exports..router"></a>

#### module.exports~router : <code>Express.Router</code>

<p>Import and initialize the express router</p>

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_app--module.exports)  
**Summary**: <p>Express Router Object</p>  
**See**: module:app.router  
<a name="module_app--module.exports..app"></a>

#### module.exports~app : <code>Express.Express</code>

<p>Initialize Express Server</p>

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_app--module.exports)  
**Summary**: <p>Main Express Application</p>  
<a name="module_app--module.exports..PORT"></a>

#### module.exports~PORT : <code>Number</code>

<p>Server Port</p>

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_app--module.exports)  
**Default**: <code>8080</code>  
<a name="module_app--module.exports..CORS_OPTIONS"></a>

#### module.exports~CORS_OPTIONS : <code>String</code>

<p>Setup Cross-Origin Resource Sharing for the development environment</p>

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_app--module.exports)  
**Summary**: <p>Cross Origin Options</p>  
**Default**: <code>http://localhost:3000</code>  
<a name="module_app--module.exports..store"></a>

#### module.exports~store : <code>MongoDBStore</code>

<p>initialize mongodb store with required configuration</p>

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_app--module.exports)  
**Summary**: <p>MongoDB Store</p>  
<a name="module_app--module.exports..apolloServer"></a>

#### module.exports~apolloServer : <code>ApolloServer</code>

<p>initialize Apollo server with required configration and attach schema</p>

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_app--module.exports)  
**Summary**: <p>Main Apollo Server</p>  
<a name="NODE_ENV"></a>

## NODE_ENV : <code>String</code>

<p>Node environment mode</p>

**Kind**: global constant  
<a name="PORT"></a>

## PORT : <code>Number</code>

<p>Server port</p>

**Kind**: global constant  
<a name="SESSION_SECRET"></a>

## SESSION_SECRET : <code>String</code>

<p>MongoDB store's session secret</p>

**Kind**: global constant  
<a name="SESSION_KEY"></a>

## SESSION_KEY : <code>String</code>

<p>MongoDB store's session key</p>

**Kind**: global constant  
<a name="MONGO_SESSION_URL"></a>

## MONGO_SESSION_URL : <code>String</code>

<p>MongoDB session table access URL</p>

**Kind**: global constant  
<a name="MONGO_APP_URL"></a>

## MONGO_APP_URL : <code>String</code>

<p>MongoDB app table access URL</p>

**Kind**: global constant  
<a name="GCP_STORAGE_BUCKET"></a>

## GCP_STORAGE_BUCKET : <code>String</code>

<p>GCP storage bucket address</p>

**Kind**: global constant  
<a name="TEST_AUTH_KEY"></a>

## TEST_AUTH_KEY : <code>String</code>

<p>Test JWT token for auth bypass</p>

**Kind**: global constant
