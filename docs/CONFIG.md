## Modules

<dl>
<dt><a href="#app.module_firebase">firebase</a></dt>
<dd><p>Firebase Confguration file</p></dd>
<dt><a href="#app.module_mongoose">mongoose</a></dt>
<dd><p>Mongoose (MongoDB) Configuration File</p></dd>
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

<a name="app.module_firebase"></a>

## firebase
<p>Firebase Confguration file</p>

**Requires**: <code>module:firebase-admin</code>, <code>module:app.winston</code>  
**Since**: 0.1.0  
**Version**: 0.1.0  

* [firebase](#app.module_firebase)
    * [.auth](#app.module_firebase.auth) : <code>Admin.auth.Auth</code>
    * [.bucket](#app.module_firebase.bucket) : <code>Admin.storage</code>

<a name="app.module_firebase.auth"></a>

### firebase.auth : <code>Admin.auth.Auth</code>
<p>Firebase Authentication Library</p>

**Kind**: static constant of [<code>firebase</code>](#app.module_firebase)  
<a name="app.module_firebase.bucket"></a>

### firebase.bucket : <code>Admin.storage</code>
<p>Firebase Storage Library</p>

**Kind**: static constant of [<code>firebase</code>](#app.module_firebase)  
<a name="app.module_mongoose"></a>

## mongoose
<p>Mongoose (MongoDB) Configuration File</p>

**Requires**: <code>module:mongoose</code>, <code>module:app.winston</code>  
**Since**: 0.1.0  
**Version**: 0.1.0  

* [mongoose](#app.module_mongoose)
    * [.db](#app.module_mongoose.db) : <code>Mongoose.Connection</code>
    * [.Mongoose](#app.module_mongoose.Mongoose) : <code>Mongoose.Mongoose</code>

<a name="app.module_mongoose.db"></a>

### mongoose.db : <code>Mongoose.Connection</code>
<p>Mongoose Database Connection</p>

**Kind**: static constant of [<code>mongoose</code>](#app.module_mongoose)  
<a name="app.module_mongoose.Mongoose"></a>

### mongoose.Mongoose : <code>Mongoose.Mongoose</code>
<p>Mongoose Library (Initialized)</p>

**Kind**: static constant of [<code>mongoose</code>](#app.module_mongoose)  
<a name="NODE_ENV"></a>

## NODE\_ENV : <code>String</code>
<p>Node environment mode</p>

**Kind**: global constant  
<a name="PORT"></a>

## PORT : <code>Number</code>
<p>Server port</p>

**Kind**: global constant  
<a name="SESSION_SECRET"></a>

## SESSION\_SECRET : <code>String</code>
<p>MongoDB store's session secret</p>

**Kind**: global constant  
<a name="SESSION_KEY"></a>

## SESSION\_KEY : <code>String</code>
<p>MongoDB store's session key</p>

**Kind**: global constant  
<a name="MONGO_SESSION_URL"></a>

## MONGO\_SESSION\_URL : <code>String</code>
<p>MongoDB session table access URL</p>

**Kind**: global constant  
<a name="MONGO_APP_URL"></a>

## MONGO\_APP\_URL : <code>String</code>
<p>MongoDB app table access URL</p>

**Kind**: global constant  
<a name="GCP_STORAGE_BUCKET"></a>

## GCP\_STORAGE\_BUCKET : <code>String</code>
<p>GCP storage bucket address</p>

**Kind**: global constant  
<a name="TEST_AUTH_KEY"></a>

## TEST\_AUTH\_KEY : <code>String</code>
<p>Test JWT token for auth bypass</p>

**Kind**: global constant  
