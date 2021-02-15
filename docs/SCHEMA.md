## Modules

<dl>
<dt><a href="#app.schema.module_AlbumModel">AlbumModel</a></dt>
<dd><p>Album Model</p></dd>
<dt><a href="#app.schema.module_ArticleModel">ArticleModel</a></dt>
<dd><p>Article Model</p></dd>
<dt><a href="#app.schema.module_CategoryMapModel">CategoryMapModel</a></dt>
<dd><p>Category Map Model</p></dd>
<dt><a href="#app.schema.module_ClubModel">ClubModel</a></dt>
<dd><p>Club Model</p></dd>
<dt><a href="#app.schema.module_CommentModel">CommentModel</a></dt>
<dd><p>Comment Model</p></dd>
<dt><a href="#app.schema.module_CompanyModel">CompanyModel</a></dt>
<dd><p>Company Model</p></dd>
<dt><a href="#app.schema.module_EventModel">EventModel</a></dt>
<dd><p>Event Model</p></dd>
<dt><a href="#app.schema.module_ForumMessageModel">ForumMessageModel</a></dt>
<dd><p>Forum Message Model</p></dd>
<dt><a href="#app.schema.module_ForumThreadModel">ForumThreadModel</a></dt>
<dd><p>Forum Thread Model</p></dd>
<dt><a href="#app.module_schema">schema</a></dt>
<dd><p>Compiled GraphQL Schema</p></dd>
<dt><a href="#app.schema.module_IssueModel">IssueModel</a></dt>
<dd><p>Issue Model</p></dd>
<dt><a href="#app.schema.module_LiveModel">LiveModel</a></dt>
<dd><p>Live Model</p></dd>
<dt><a href="#app.schema.module_MediaModel">MediaModel</a></dt>
<dd><p>Media Model</p></dd>
<dt><a href="#app.schema.module_PollModel">PollModel</a></dt>
<dd><p>Poll Model</p></dd>
<dt><a href="#app.schema.module_ReactionModel">ReactionModel</a></dt>
<dd><p>Reaction Model</p></dd>
<dt><a href="#app.schema.module_RoleModel">RoleModel</a></dt>
<dd><p>Role Model</p></dd>
<dt><a href="#app.schema.module_SessionModel">SessionModel</a></dt>
<dd><p>Session Model</p></dd>
<dt><a href="#app.schema.module_ShareInternshipModel">ShareInternshipModel</a></dt>
<dd><p>Share Internship Model</p></dd>
<dt><a href="#app.schema.module_SquiggleModel">SquiggleModel</a></dt>
<dd><p>Squiggle Model</p></dd>
<dt><a href="#app.schema.module_TagModel">TagModel</a></dt>
<dd><p>Tag Model</p></dd>
<dt><a href="#app.schema.module_UserModel">UserModel</a></dt>
<dd><p>User Model</p></dd>
<dt><a href="#app.schema.module_UserMutation">UserMutation</a></dt>
<dd><p>User Mutation</p></dd>
<dt><a href="#app.schema.module_UserQuery">UserQuery</a></dt>
<dd><p>User Query</p></dd>
<dt><a href="#app.schema.module_User">User</a></dt>
<dd><p>User Schema</p></dd>
<dt><a href="#app.schema.module_UserType">UserType</a></dt>
<dd><p>User Type</p></dd>
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

<a name="app.schema.module_AlbumModel"></a>

## AlbumModel

<p>Album Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [AlbumModel](#app.schema.module_AlbumModel)
  - [~AlbumSchema](#app.schema.module_AlbumModel..AlbumSchema) : <code>Schema</code>
  - [~AlbumModel](#app.schema.module_AlbumModel..AlbumModel) : <code>model</code>

<a name="app.schema.module_AlbumModel..AlbumSchema"></a>

### AlbumModel~AlbumSchema : <code>Schema</code>

<p>The schema definition for Album Model</p>

**Kind**: inner constant of [<code>AlbumModel</code>](#app.schema.module_AlbumModel)  
<a name="app.schema.module_AlbumModel..AlbumModel"></a>

### AlbumModel~AlbumModel : <code>model</code>

<p>Generated Album Model</p>

**Kind**: inner constant of [<code>AlbumModel</code>](#app.schema.module_AlbumModel)  
<a name="app.schema.module_ArticleModel"></a>

## ArticleModel

<p>Article Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [ArticleModel](#app.schema.module_ArticleModel)
  - [~articleType](#app.schema.module_ArticleModel..articleType)
  - [~status](#app.schema.module_ArticleModel..status)
  - [~views](#app.schema.module_ArticleModel..views)
  - [~hits](#app.schema.module_ArticleModel..hits)
  - [~ArticleSchema](#app.schema.module_ArticleModel..ArticleSchema) : <code>Schema</code>
  - [~ArticleModel](#app.schema.module_ArticleModel..ArticleModel) : <code>model</code>

<a name="app.schema.module_ArticleModel..articleType"></a>

### ArticleModel~articleType

<p>[0 - Normal Article, 1 - Witsdom, 2 - Photostory]</p>

**Kind**: inner property of [<code>ArticleModel</code>](#app.schema.module_ArticleModel)  
<a name="app.schema.module_ArticleModel..status"></a>

### ArticleModel~status

<p>[0 - Unpublished, 1 - Published, 2 - Archive, 3 - Trash]</p>

**Kind**: inner property of [<code>ArticleModel</code>](#app.schema.module_ArticleModel)  
<a name="app.schema.module_ArticleModel..views"></a>

### ArticleModel~views

<p>For reads &gt; 10% of readTime</p>

**Kind**: inner property of [<code>ArticleModel</code>](#app.schema.module_ArticleModel)  
<a name="app.schema.module_ArticleModel..hits"></a>

### ArticleModel~hits

<p>For each load</p>

**Kind**: inner property of [<code>ArticleModel</code>](#app.schema.module_ArticleModel)  
<a name="app.schema.module_ArticleModel..ArticleSchema"></a>

### ArticleModel~ArticleSchema : <code>Schema</code>

<p>The schema definition for Article Model</p>

**Kind**: inner constant of [<code>ArticleModel</code>](#app.schema.module_ArticleModel)  
<a name="app.schema.module_ArticleModel..ArticleModel"></a>

### ArticleModel~ArticleModel : <code>model</code>

<p>Generated Article Model</p>

**Kind**: inner constant of [<code>ArticleModel</code>](#app.schema.module_ArticleModel)  
<a name="app.schema.module_CategoryMapModel"></a>

## CategoryMapModel

<p>Category Map Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [CategoryMapModel](#app.schema.module_CategoryMapModel)
  - [~CategoryMapSchema](#app.schema.module_CategoryMapModel..CategoryMapSchema) : <code>Schema</code>
  - [~CategoryMapModel](#app.schema.module_CategoryMapModel..CategoryMapModel) : <code>model</code>

<a name="app.schema.module_CategoryMapModel..CategoryMapSchema"></a>

### CategoryMapModel~CategoryMapSchema : <code>Schema</code>

<p>The schema definition for Category Map Model</p>

**Kind**: inner constant of [<code>CategoryMapModel</code>](#app.schema.module_CategoryMapModel)  
<a name="app.schema.module_CategoryMapModel..CategoryMapModel"></a>

### CategoryMapModel~CategoryMapModel : <code>model</code>

<p>Generated Category Map Model</p>

**Kind**: inner constant of [<code>CategoryMapModel</code>](#app.schema.module_CategoryMapModel)  
<a name="app.schema.module_ClubModel"></a>

## ClubModel

<p>Club Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [ClubModel](#app.schema.module_ClubModel)
  - [~ClubSchema](#app.schema.module_ClubModel..ClubSchema) : <code>Schema</code>
  - [~ClubModel](#app.schema.module_ClubModel..ClubModel) : <code>model</code>

<a name="app.schema.module_ClubModel..ClubSchema"></a>

### ClubModel~ClubSchema : <code>Schema</code>

<p>The schema definition for Club Model</p>

**Kind**: inner constant of [<code>ClubModel</code>](#app.schema.module_ClubModel)  
<a name="app.schema.module_ClubModel..ClubModel"></a>

### ClubModel~ClubModel : <code>model</code>

<p>Generated Club Model</p>

**Kind**: inner constant of [<code>ClubModel</code>](#app.schema.module_ClubModel)  
<a name="app.schema.module_CommentModel"></a>

## CommentModel

<p>Comment Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [CommentModel](#app.schema.module_CommentModel)
  - [~CommentSchema](#app.schema.module_CommentModel..CommentSchema) : <code>Schema</code>
  - [~CommentModel](#app.schema.module_CommentModel..CommentModel) : <code>model</code>

<a name="app.schema.module_CommentModel..CommentSchema"></a>

### CommentModel~CommentSchema : <code>Schema</code>

<p>The schema definition for Comment Model</p>

**Kind**: inner constant of [<code>CommentModel</code>](#app.schema.module_CommentModel)  
<a name="app.schema.module_CommentModel..CommentModel"></a>

### CommentModel~CommentModel : <code>model</code>

<p>Generated Comment Model</p>

**Kind**: inner constant of [<code>CommentModel</code>](#app.schema.module_CommentModel)  
<a name="app.schema.module_CompanyModel"></a>

## CompanyModel

<p>Company Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [CompanyModel](#app.schema.module_CompanyModel)
  - [~CompanySchema](#app.schema.module_CompanyModel..CompanySchema) : <code>Schema</code>
  - [~CompanyModel](#app.schema.module_CompanyModel..CompanyModel) : <code>model</code>

<a name="app.schema.module_CompanyModel..CompanySchema"></a>

### CompanyModel~CompanySchema : <code>Schema</code>

<p>The schema definition for Company Model</p>

**Kind**: inner constant of [<code>CompanyModel</code>](#app.schema.module_CompanyModel)  
<a name="app.schema.module_CompanyModel..CompanyModel"></a>

### CompanyModel~CompanyModel : <code>model</code>

<p>Generated Company Model</p>

**Kind**: inner constant of [<code>CompanyModel</code>](#app.schema.module_CompanyModel)  
<a name="app.schema.module_EventModel"></a>

## EventModel

<p>Event Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [EventModel](#app.schema.module_EventModel)
  - [~type](#app.schema.module_EventModel..type)
  - [~EventSchema](#app.schema.module_EventModel..EventSchema) : <code>Schema</code>
  - [~EventModel](#app.schema.module_EventModel..EventModel) : <code>model</code>

<a name="app.schema.module_EventModel..type"></a>

### EventModel~type

<p>[0 - Club, 1 - Institute, 2 - Fest, 3 - Holiday]</p>

**Kind**: inner property of [<code>EventModel</code>](#app.schema.module_EventModel)  
<a name="app.schema.module_EventModel..EventSchema"></a>

### EventModel~EventSchema : <code>Schema</code>

<p>The schema definition for Event Model</p>

**Kind**: inner constant of [<code>EventModel</code>](#app.schema.module_EventModel)  
<a name="app.schema.module_EventModel..EventModel"></a>

### EventModel~EventModel : <code>model</code>

<p>Generated Event Model</p>

**Kind**: inner constant of [<code>EventModel</code>](#app.schema.module_EventModel)  
<a name="app.schema.module_ForumMessageModel"></a>

## ForumMessageModel

<p>Forum Message Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [ForumMessageModel](#app.schema.module_ForumMessageModel)
  - [~anonymous](#app.schema.module_ForumMessageModel..anonymous)
  - [~ForumMessageSchema](#app.schema.module_ForumMessageModel..ForumMessageSchema) : <code>Schema</code>
  - [~ForumMessageModel](#app.schema.module_ForumMessageModel..ForumMessageModel) : <code>model</code>

<a name="app.schema.module_ForumMessageModel..anonymous"></a>

### ForumMessageModel~anonymous

<p>Additional permission required</p>

**Kind**: inner property of [<code>ForumMessageModel</code>](#app.schema.module_ForumMessageModel)  
<a name="app.schema.module_ForumMessageModel..ForumMessageSchema"></a>

### ForumMessageModel~ForumMessageSchema : <code>Schema</code>

<p>The schema definition for Forum Message Model</p>

**Kind**: inner constant of [<code>ForumMessageModel</code>](#app.schema.module_ForumMessageModel)  
<a name="app.schema.module_ForumMessageModel..ForumMessageModel"></a>

### ForumMessageModel~ForumMessageModel : <code>model</code>

<p>Generated Forum Message Model</p>

**Kind**: inner constant of [<code>ForumMessageModel</code>](#app.schema.module_ForumMessageModel)  
<a name="app.schema.module_ForumThreadModel"></a>

## ForumThreadModel

<p>Forum Thread Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [ForumThreadModel](#app.schema.module_ForumThreadModel)
  - [~anonymous](#app.schema.module_ForumThreadModel..anonymous)
  - [~threadStatus](#app.schema.module_ForumThreadModel..threadStatus)
  - [~ForumThreadSchema](#app.schema.module_ForumThreadModel..ForumThreadSchema) : <code>Schema</code>
  - [~ForumThreadModel](#app.schema.module_ForumThreadModel..ForumThreadModel) : <code>model</code>

<a name="app.schema.module_ForumThreadModel..anonymous"></a>

### ForumThreadModel~anonymous

<p>Additional permission required</p>

**Kind**: inner property of [<code>ForumThreadModel</code>](#app.schema.module_ForumThreadModel)  
<a name="app.schema.module_ForumThreadModel..threadStatus"></a>

### ForumThreadModel~threadStatus

<p>[0 - Pending Moderation, 1 - Open, 2 - Closed]</p>

**Kind**: inner property of [<code>ForumThreadModel</code>](#app.schema.module_ForumThreadModel)  
<a name="app.schema.module_ForumThreadModel..ForumThreadSchema"></a>

### ForumThreadModel~ForumThreadSchema : <code>Schema</code>

<p>The schema definition for Forum Thread Model</p>

**Kind**: inner constant of [<code>ForumThreadModel</code>](#app.schema.module_ForumThreadModel)  
<a name="app.schema.module_ForumThreadModel..ForumThreadModel"></a>

### ForumThreadModel~ForumThreadModel : <code>model</code>

<p>Generated Forum Thread Model</p>

**Kind**: inner constant of [<code>ForumThreadModel</code>](#app.schema.module_ForumThreadModel)  
<a name="app.module_schema"></a>

## schema

<p>Compiled GraphQL Schema</p>

**Requires**: <code>module:graphql</code>, <code>module:app.schema.query</code>, <code>module:app.schema.mutation</code>, <code>module:app.schema.subscription</code>  
**Since**: 0.1.0  
**Version**: v1  
<a name="app.schema.module_IssueModel"></a>

## IssueModel

<p>Issue Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [IssueModel](#app.schema.module_IssueModel)
  - [~IssueSchema](#app.schema.module_IssueModel..IssueSchema) : <code>Schema</code>
  - [~IssueModel](#app.schema.module_IssueModel..IssueModel) : <code>model</code>

<a name="app.schema.module_IssueModel..IssueSchema"></a>

### IssueModel~IssueSchema : <code>Schema</code>

<p>The schema definition for Issue Model</p>

**Kind**: inner constant of [<code>IssueModel</code>](#app.schema.module_IssueModel)  
<a name="app.schema.module_IssueModel..IssueModel"></a>

### IssueModel~IssueModel : <code>model</code>

<p>Generated Issue Model</p>

**Kind**: inner constant of [<code>IssueModel</code>](#app.schema.module_IssueModel)  
<a name="app.schema.module_LiveModel"></a>

## LiveModel

<p>Live Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [LiveModel](#app.schema.module_LiveModel)
  - [~type](#app.schema.module_LiveModel..type)
  - [~benefits](#app.schema.module_LiveModel..benefits)
  - [~LiveSchema](#app.schema.module_LiveModel..LiveSchema) : <code>Schema</code>
  - [~LiveModel](#app.schema.module_LiveModel..LiveModel) : <code>model</code>

<a name="app.schema.module_LiveModel..type"></a>

### LiveModel~type

<p>[0-3 - Category 0-3, 4 - Internship]</p>

**Kind**: inner property of [<code>LiveModel</code>](#app.schema.module_LiveModel)  
<a name="app.schema.module_LiveModel..benefits"></a>

### LiveModel~benefits

<p>For type 4 - Add internship duration</p>

**Kind**: inner property of [<code>LiveModel</code>](#app.schema.module_LiveModel)  
<a name="app.schema.module_LiveModel..LiveSchema"></a>

### LiveModel~LiveSchema : <code>Schema</code>

<p>The schema definition for Live Model</p>

**Kind**: inner constant of [<code>LiveModel</code>](#app.schema.module_LiveModel)  
<a name="app.schema.module_LiveModel..LiveModel"></a>

### LiveModel~LiveModel : <code>model</code>

<p>Generated Live Model</p>

**Kind**: inner constant of [<code>LiveModel</code>](#app.schema.module_LiveModel)  
<a name="app.schema.module_MediaModel"></a>

## MediaModel

<p>Media Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [MediaModel](#app.schema.module_MediaModel)
  - [~type](#app.schema.module_MediaModel..type)
  - [~blurhash](#app.schema.module_MediaModel..blurhash)
  - [~MediaSchema](#app.schema.module_MediaModel..MediaSchema) : <code>Schema</code>
  - [~MediaModel](#app.schema.module_MediaModel..MediaModel) : <code>model</code>

<a name="app.schema.module_MediaModel..type"></a>

### MediaModel~type

<p>[0 - Image, 1 - Video]</p>

**Kind**: inner property of [<code>MediaModel</code>](#app.schema.module_MediaModel)  
<a name="app.schema.module_MediaModel..blurhash"></a>

### MediaModel~blurhash

<p>Only if type is 0</p>

**Kind**: inner property of [<code>MediaModel</code>](#app.schema.module_MediaModel)  
<a name="app.schema.module_MediaModel..MediaSchema"></a>

### MediaModel~MediaSchema : <code>Schema</code>

<p>The schema definition for Media Model</p>

**Kind**: inner constant of [<code>MediaModel</code>](#app.schema.module_MediaModel)  
<a name="app.schema.module_MediaModel..MediaModel"></a>

### MediaModel~MediaModel : <code>model</code>

<p>Generated Media Model</p>

**Kind**: inner constant of [<code>MediaModel</code>](#app.schema.module_MediaModel)  
<a name="app.schema.module_PollModel"></a>

## PollModel

<p>Poll Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [PollModel](#app.schema.module_PollModel)
  - [~PollSchema](#app.schema.module_PollModel..PollSchema) : <code>Schema</code>
  - [~PollModel](#app.schema.module_PollModel..PollModel) : <code>model</code>

<a name="app.schema.module_PollModel..PollSchema"></a>

### PollModel~PollSchema : <code>Schema</code>

<p>The schema definition for Poll Model</p>

**Kind**: inner constant of [<code>PollModel</code>](#app.schema.module_PollModel)  
<a name="app.schema.module_PollModel..PollModel"></a>

### PollModel~PollModel : <code>model</code>

<p>Generated Poll Model</p>

**Kind**: inner constant of [<code>PollModel</code>](#app.schema.module_PollModel)  
<a name="app.schema.module_ReactionModel"></a>

## ReactionModel

<p>Reaction Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [ReactionModel](#app.schema.module_ReactionModel)
  - [~type](#app.schema.module_ReactionModel..type)
  - [~ReactionSchema](#app.schema.module_ReactionModel..ReactionSchema) : <code>Schema</code>
  - [~ReactionModel](#app.schema.module_ReactionModel..ReactionModel) : <code>model</code>

<a name="app.schema.module_ReactionModel..type"></a>

### ReactionModel~type

<p>[0 - Like, 1 - Upvote]</p>

**Kind**: inner property of [<code>ReactionModel</code>](#app.schema.module_ReactionModel)  
<a name="app.schema.module_ReactionModel..ReactionSchema"></a>

### ReactionModel~ReactionSchema : <code>Schema</code>

<p>The schema definition for Reaction Model</p>

**Kind**: inner constant of [<code>ReactionModel</code>](#app.schema.module_ReactionModel)  
<a name="app.schema.module_ReactionModel..ReactionModel"></a>

### ReactionModel~ReactionModel : <code>model</code>

<p>Generated Reaction Model</p>

**Kind**: inner constant of [<code>ReactionModel</code>](#app.schema.module_ReactionModel)  
<a name="app.schema.module_RoleModel"></a>

## RoleModel

<p>Role Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [RoleModel](#app.schema.module_RoleModel)
  - [~RoleSchema](#app.schema.module_RoleModel..RoleSchema) : <code>Schema</code>
  - [~RoleModel](#app.schema.module_RoleModel..RoleModel) : <code>model</code>

<a name="app.schema.module_RoleModel..RoleSchema"></a>

### RoleModel~RoleSchema : <code>Schema</code>

<p>The schema definition for Role Model</p>

**Kind**: inner constant of [<code>RoleModel</code>](#app.schema.module_RoleModel)  
<a name="app.schema.module_RoleModel..RoleModel"></a>

### RoleModel~RoleModel : <code>model</code>

<p>Generated Role Model</p>

**Kind**: inner constant of [<code>RoleModel</code>](#app.schema.module_RoleModel)  
<a name="app.schema.module_SessionModel"></a>

## SessionModel

<p>Session Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [SessionModel](#app.schema.module_SessionModel)
  - [~position](#app.schema.module_SessionModel..position)
  - [~team](#app.schema.module_SessionModel..team)
  - [~SessionSchema](#app.schema.module_SessionModel..SessionSchema) : <code>Schema</code>
  - [~SessionModel](#app.schema.module_SessionModel..SessionModel) : <code>model</code>

<a name="app.schema.module_SessionModel..position"></a>

### SessionModel~position

<p>[0 - Member, 1 - Coordinator, 2 - Mentor]</p>

**Kind**: inner property of [<code>SessionModel</code>](#app.schema.module_SessionModel)  
<a name="app.schema.module_SessionModel..team"></a>

### SessionModel~team

<p>[0 - Content, 1 - Photography, 2 - Design, 3 - Technical]</p>

**Kind**: inner property of [<code>SessionModel</code>](#app.schema.module_SessionModel)  
<a name="app.schema.module_SessionModel..SessionSchema"></a>

### SessionModel~SessionSchema : <code>Schema</code>

<p>The schema definition for Session Model</p>

**Kind**: inner constant of [<code>SessionModel</code>](#app.schema.module_SessionModel)  
<a name="app.schema.module_SessionModel..SessionModel"></a>

### SessionModel~SessionModel : <code>model</code>

<p>Generated Session Model</p>

**Kind**: inner constant of [<code>SessionModel</code>](#app.schema.module_SessionModel)  
<a name="app.schema.module_ShareInternshipModel"></a>

## ShareInternshipModel

<p>Share Internship Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [ShareInternshipModel](#app.schema.module_ShareInternshipModel)
  - [~duration](#app.schema.module_ShareInternshipModel..duration)
  - [~ShareInternshipSchema](#app.schema.module_ShareInternshipModel..ShareInternshipSchema) : <code>Schema</code>
  - [~ShareInternshipModel](#app.schema.module_ShareInternshipModel..ShareInternshipModel) : <code>model</code>

<a name="app.schema.module_ShareInternshipModel..duration"></a>

### ShareInternshipModel~duration

<p>Written in weeks</p>

**Kind**: inner property of [<code>ShareInternshipModel</code>](#app.schema.module_ShareInternshipModel)  
<a name="app.schema.module_ShareInternshipModel..ShareInternshipSchema"></a>

### ShareInternshipModel~ShareInternshipSchema : <code>Schema</code>

<p>The schema definition for Share Internship Model</p>

**Kind**: inner constant of [<code>ShareInternshipModel</code>](#app.schema.module_ShareInternshipModel)  
<a name="app.schema.module_ShareInternshipModel..ShareInternshipModel"></a>

### ShareInternshipModel~ShareInternshipModel : <code>model</code>

<p>Generated Share Internship Model</p>

**Kind**: inner constant of [<code>ShareInternshipModel</code>](#app.schema.module_ShareInternshipModel)  
<a name="app.schema.module_SquiggleModel"></a>

## SquiggleModel

<p>Squiggle Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [SquiggleModel](#app.schema.module_SquiggleModel)
  - [~SquiggleSchema](#app.schema.module_SquiggleModel..SquiggleSchema) : <code>Schema</code>
  - [~SquiggleModel](#app.schema.module_SquiggleModel..SquiggleModel) : <code>model</code>

<a name="app.schema.module_SquiggleModel..SquiggleSchema"></a>

### SquiggleModel~SquiggleSchema : <code>Schema</code>

<p>The schema definition for Squiggle Model</p>

**Kind**: inner constant of [<code>SquiggleModel</code>](#app.schema.module_SquiggleModel)  
<a name="app.schema.module_SquiggleModel..SquiggleModel"></a>

### SquiggleModel~SquiggleModel : <code>model</code>

<p>Generated Squiggle Model</p>

**Kind**: inner constant of [<code>SquiggleModel</code>](#app.schema.module_SquiggleModel)  
<a name="app.schema.module_TagModel"></a>

## TagModel

<p>Tag Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [TagModel](#app.schema.module_TagModel)
  - [~TagModel](#app.schema.module_TagModel..TagModel) : <code>Schema</code>
  - [~TagModel](#app.schema.module_TagModel..TagModel) : <code>model</code>

<a name="app.schema.module_TagModel..TagModel"></a>

### TagModel~TagModel : <code>Schema</code>

<p>The schema definition for Tag Model</p>

**Kind**: inner constant of [<code>TagModel</code>](#app.schema.module_TagModel)  
<a name="app.schema.module_TagModel..TagModel"></a>

### TagModel~TagModel : <code>model</code>

<p>Generated Tag Model</p>

**Kind**: inner constant of [<code>TagModel</code>](#app.schema.module_TagModel)  
<a name="app.schema.module_UserModel"></a>

## UserModel

<p>User Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [UserModel](#app.schema.module_UserModel)
  - [~verifiedType](#app.schema.module_UserModel..verifiedType)
  - [~profile](#app.schema.module_UserModel..profile)
    - [.github](#app.schema.module_UserModel..profile.github)
  - [~positionType](#app.schema.module_UserModel..positionType)
  - [~team](#app.schema.module_UserModel..team)
  - [~lastPoll](#app.schema.module_UserModel..lastPoll)
  - [~UserSchema](#app.schema.module_UserModel..UserSchema) : <code>Schema</code>
  - [~UserModel](#app.schema.module_UserModel..UserModel) : <code>model</code>

<a name="app.schema.module_UserModel..verifiedType"></a>

### UserModel~verifiedType

<p>[0 - Normal, 1 - NITR Student, 2 - MM, 3 - NITR Faculty]</p>

**Kind**: inner property of [<code>UserModel</code>](#app.schema.module_UserModel)  
<a name="app.schema.module_UserModel..profile"></a>

### UserModel~profile

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>UserModel</code>](#app.schema.module_UserModel)  
<a name="app.schema.module_UserModel..profile.github"></a>

#### profile.github

<p>Only For MM Tech Team</p>

**Kind**: static property of [<code>profile</code>](#app.schema.module_UserModel..profile)  
<a name="app.schema.module_UserModel..positionType"></a>

### UserModel~positionType

<p>[0 - Member, 1 - Coordinator, 2 - Mentor]</p>

**Kind**: inner property of [<code>UserModel</code>](#app.schema.module_UserModel)  
<a name="app.schema.module_UserModel..team"></a>

### UserModel~team

<p>[0 - Content, 1 - Photography, 2 - Design, 3 - Technical]</p>

**Kind**: inner property of [<code>UserModel</code>](#app.schema.module_UserModel)  
<a name="app.schema.module_UserModel..lastPoll"></a>

### UserModel~lastPoll

**Kind**: inner property of [<code>UserModel</code>](#app.schema.module_UserModel)  
**See**: module:app.models.poll  
<a name="app.schema.module_UserModel..UserSchema"></a>

### UserModel~UserSchema : <code>Schema</code>

<p>The schema definition for User Model</p>

**Kind**: inner constant of [<code>UserModel</code>](#app.schema.module_UserModel)  
<a name="app.schema.module_UserModel..UserModel"></a>

### UserModel~UserModel : <code>model</code>

<p>Generated User Model</p>

**Kind**: inner constant of [<code>UserModel</code>](#app.schema.module_UserModel)  
<a name="app.schema.module_UserMutation"></a>

## UserMutation

<p>User Mutation</p>

**Requires**: <code>module:app.schema.scalars</code>  
**Since**: 0.1.0  
**Version**: v1  
<a name="app.schema.module_UserQuery"></a>

## UserQuery

<p>User Query</p>

**Requires**: <code>module:app.schema.scalars</code>  
**Since**: 0.1.0  
**Version**: v1  
<a name="app.schema.module_User"></a>

## User

<p>User Schema</p>

**Requires**: <code>module:app.schema.scalars</code>, <code>module:app.schema.UserQuery</code>, <code>module:app.schema.UserMutation</code>  
**Since**: 0.1.0  
**Version**: v1  
<a name="app.schema.module_UserType"></a>

## UserType

<p>User Type</p>

**Requires**: <code>module:app.schema.scalars</code>  
**Since**: 0.1.0  
**Version**: v1  
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
