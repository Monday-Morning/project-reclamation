## Modules

<dl>
<dt><a href="#app.module_models">models</a></dt>
<dd><p>MongoDB Models</p></dd>
<dt><a href="#app.models.module_role">role</a></dt>
<dd><p>Role Model</p></dd>
<dt><a href="#app.models.module_user">user</a></dt>
<dd><p>User Model</p></dd>
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

<a name="app.module_models"></a>

## models

<p>MongoDB Models</p>

**Requires**: <code>module:app.models.user</code>, <code>module:app.models.role</code>  
**Since**: 0.1.0  
**Version**: 0.1.0

- [models](#app.module_models)
  - [.UserModel](#app.module_models.UserModel)
  - [.RoleModel](#app.module_models.RoleModel)

<a name="app.module_models.UserModel"></a>

### models.UserModel

<p>User Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.user  
<a name="app.module_models.RoleModel"></a>

### models.RoleModel

<p>Role Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.role  
<a name="app.models.module_role"></a>

## role

<p>Role Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [role](#app.models.module_role)
  - [~RoleSchema](#app.models.module_role..RoleSchema) : <code>Schema</code>
  - [~RoleModel](#app.models.module_role..RoleModel) : <code>model</code>

<a name="app.models.module_role..RoleSchema"></a>

### role~RoleSchema : <code>Schema</code>

<p>The schema definition for Role Model</p>

**Kind**: inner constant of [<code>role</code>](#app.models.module_role)  
<a name="app.models.module_role..RoleModel"></a>

### role~RoleModel : <code>model</code>

<p>Generated Role Model</p>

**Kind**: inner constant of [<code>role</code>](#app.models.module_role)  
<a name="app.models.module_user"></a>

## user

<p>User Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [user](#app.models.module_user)
  - [~roles](#app.models.module_user..roles)
  - [~bio](#app.models.module_user..bio)
  - [~facebook](#app.models.module_user..facebook)
  - [~twitter](#app.models.module_user..twitter)
  - [~instagram](#app.models.module_user..instagram)
  - [~linkedin](#app.models.module_user..linkedin)
  - [~website](#app.models.module_user..website)
  - [~github](#app.models.module_user..github)
  - [~contributions](#app.models.module_user..contributions)
  - [~positions](#app.models.module_user..positions)
  - [~verifiedType](#app.models.module_user..verifiedType)
  - [~UserSchema](#app.models.module_user..UserSchema) : <code>Schema</code>
  - [~UserModel](#app.models.module_user..UserModel) : <code>model</code>

<a name="app.models.module_user..roles"></a>

### user~roles

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
**Default**: <code>reader</code>  
<a name="app.models.module_user..bio"></a>

### user~bio

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..facebook"></a>

### user~facebook

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..twitter"></a>

### user~twitter

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..instagram"></a>

### user~instagram

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..linkedin"></a>

### user~linkedin

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..website"></a>

### user~website

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..github"></a>

### user~github

<p>Only For MM Tech Team</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..contributions"></a>

### user~contributions

<p>Object {
onModel: &quot;Article&quot; || &quot;Media&quot;,
modelRef: Schema.Types.ObjectID
}</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..positions"></a>

### user~positions

<p>Only For MM
Object {
type: {Number}[0 - Member, 1 - Coordinator, 3 - Mentor],
team: {Number}[0 - Content, 1 - Technical, 2 - Design, 3 - Photography],
session: Number,
}</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..verifiedType"></a>

### user~verifiedType

**Kind**: inner enum of [<code>user</code>](#app.models.module_user)  
**Properties**

| Name     | Default             |
| -------- | ------------------- |
| type     | <code>Number</code> |
| required | <code>true</code>   |
| min      | <code>0</code>      |
| max      | <code>3</code>      |

<a name="app.models.module_user..UserSchema"></a>

### user~UserSchema : <code>Schema</code>

<p>The schema definition for User Model</p>

**Kind**: inner constant of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..UserModel"></a>

### user~UserModel : <code>model</code>

<p>Generated User Model</p>

**Kind**: inner constant of [<code>user</code>](#app.models.module_user)  
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
