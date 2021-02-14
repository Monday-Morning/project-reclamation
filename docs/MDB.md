## Modules

<dl>
<dt><a href="#app.models.module_album">album</a></dt>
<dd><p>Album Model</p></dd>
<dt><a href="#app.models.module_article">article</a></dt>
<dd><p>Article Model</p></dd>
<dt><a href="#app.models.module_categoryMap">categoryMap</a></dt>
<dd><p>Category Map Model</p></dd>
<dt><a href="#app.models.module_club">club</a></dt>
<dd><p>Club Model</p></dd>
<dt><a href="#app.models.module_comment">comment</a></dt>
<dd><p>Comment Model</p></dd>
<dt><a href="#app.models.module_company">company</a></dt>
<dd><p>Company Model</p></dd>
<dt><a href="#app.models.module_event">event</a></dt>
<dd><p>Event Model</p></dd>
<dt><a href="#app.models.forum.module_message">message</a></dt>
<dd><p>Forum Message Model</p></dd>
<dt><a href="#app.models.forum.module_thread">thread</a></dt>
<dd><p>Forum Thread Model</p></dd>
<dt><a href="#app.module_models">models</a></dt>
<dd><p>MongoDB Models</p></dd>
<dt><a href="#app.models.module_issue">issue</a></dt>
<dd><p>Issue Model</p></dd>
<dt><a href="#app.models.module_live">live</a></dt>
<dd><p>Live Model</p></dd>
<dt><a href="#app.models.module_media">media</a></dt>
<dd><p>Media Model</p></dd>
<dt><a href="#app.models.module_poll">poll</a></dt>
<dd><p>Poll Model</p></dd>
<dt><a href="#app.models.module_reaction">reaction</a></dt>
<dd><p>Reaction Model</p></dd>
<dt><a href="#app.models.module_role">role</a></dt>
<dd><p>Role Model</p></dd>
<dt><a href="#app.models.module_session">session</a></dt>
<dd><p>Session Model</p></dd>
<dt><a href="#app.models.module_shareInternships">shareInternships</a></dt>
<dd><p>Share Internship Model</p></dd>
<dt><a href="#app.models.module_squiggle">squiggle</a></dt>
<dd><p>Squiggle Model</p></dd>
<dt><a href="#app.models.module_tag">tag</a></dt>
<dd><p>Tag Model</p></dd>
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

<a name="app.models.module_album"></a>

## album

<p>Album Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [album](#app.models.module_album)
  - [~AlbumSchema](#app.models.module_album..AlbumSchema) : <code>Schema</code>
  - [~AlbumModel](#app.models.module_album..AlbumModel) : <code>model</code>

<a name="app.models.module_album..AlbumSchema"></a>

### album~AlbumSchema : <code>Schema</code>

<p>The schema definition for Album Model</p>

**Kind**: inner constant of [<code>album</code>](#app.models.module_album)  
<a name="app.models.module_album..AlbumModel"></a>

### album~AlbumModel : <code>model</code>

<p>Generated Album Model</p>

**Kind**: inner constant of [<code>album</code>](#app.models.module_album)  
<a name="app.models.module_article"></a>

## article

<p>Article Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [article](#app.models.module_article)
  - [~articleType](#app.models.module_article..articleType)
  - [~status](#app.models.module_article..status)
  - [~views](#app.models.module_article..views)
  - [~hits](#app.models.module_article..hits)
  - [~ArticleSchema](#app.models.module_article..ArticleSchema) : <code>Schema</code>
  - [~ArticleModel](#app.models.module_article..ArticleModel) : <code>model</code>

<a name="app.models.module_article..articleType"></a>

### article~articleType

<p>[0 - Normal Article, 1 - Witsdom, 2 - Photostory]</p>

**Kind**: inner property of [<code>article</code>](#app.models.module_article)  
<a name="app.models.module_article..status"></a>

### article~status

<p>[0 - Unpublished, 1 - Published, 2 - Archive, 3 - Trash]</p>

**Kind**: inner property of [<code>article</code>](#app.models.module_article)  
<a name="app.models.module_article..views"></a>

### article~views

<p>For reads &gt; 10% of readTime</p>

**Kind**: inner property of [<code>article</code>](#app.models.module_article)  
<a name="app.models.module_article..hits"></a>

### article~hits

<p>For each load</p>

**Kind**: inner property of [<code>article</code>](#app.models.module_article)  
<a name="app.models.module_article..ArticleSchema"></a>

### article~ArticleSchema : <code>Schema</code>

<p>The schema definition for Article Model</p>

**Kind**: inner constant of [<code>article</code>](#app.models.module_article)  
<a name="app.models.module_article..ArticleModel"></a>

### article~ArticleModel : <code>model</code>

<p>Generated Article Model</p>

**Kind**: inner constant of [<code>article</code>](#app.models.module_article)  
<a name="app.models.module_categoryMap"></a>

## categoryMap

<p>Category Map Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [categoryMap](#app.models.module_categoryMap)
  - [~CategoryMapSchema](#app.models.module_categoryMap..CategoryMapSchema) : <code>Schema</code>
  - [~CategoryMapModel](#app.models.module_categoryMap..CategoryMapModel) : <code>model</code>

<a name="app.models.module_categoryMap..CategoryMapSchema"></a>

### categoryMap~CategoryMapSchema : <code>Schema</code>

<p>The schema definition for Category Map Model</p>

**Kind**: inner constant of [<code>categoryMap</code>](#app.models.module_categoryMap)  
<a name="app.models.module_categoryMap..CategoryMapModel"></a>

### categoryMap~CategoryMapModel : <code>model</code>

<p>Generated Category Map Model</p>

**Kind**: inner constant of [<code>categoryMap</code>](#app.models.module_categoryMap)  
<a name="app.models.module_club"></a>

## club

<p>Club Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [club](#app.models.module_club)
  - [~ClubSchema](#app.models.module_club..ClubSchema) : <code>Schema</code>
  - [~ClubModel](#app.models.module_club..ClubModel) : <code>model</code>

<a name="app.models.module_club..ClubSchema"></a>

### club~ClubSchema : <code>Schema</code>

<p>The schema definition for Club Model</p>

**Kind**: inner constant of [<code>club</code>](#app.models.module_club)  
<a name="app.models.module_club..ClubModel"></a>

### club~ClubModel : <code>model</code>

<p>Generated Club Model</p>

**Kind**: inner constant of [<code>club</code>](#app.models.module_club)  
<a name="app.models.module_comment"></a>

## comment

<p>Comment Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [comment](#app.models.module_comment)
  - [~CommentSchema](#app.models.module_comment..CommentSchema) : <code>Schema</code>
  - [~CommentModel](#app.models.module_comment..CommentModel) : <code>model</code>

<a name="app.models.module_comment..CommentSchema"></a>

### comment~CommentSchema : <code>Schema</code>

<p>The schema definition for Comment Model</p>

**Kind**: inner constant of [<code>comment</code>](#app.models.module_comment)  
<a name="app.models.module_comment..CommentModel"></a>

### comment~CommentModel : <code>model</code>

<p>Generated Comment Model</p>

**Kind**: inner constant of [<code>comment</code>](#app.models.module_comment)  
<a name="app.models.module_company"></a>

## company

<p>Company Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [company](#app.models.module_company)
  - [~CompanySchema](#app.models.module_company..CompanySchema) : <code>Schema</code>
  - [~CompanyModel](#app.models.module_company..CompanyModel) : <code>model</code>

<a name="app.models.module_company..CompanySchema"></a>

### company~CompanySchema : <code>Schema</code>

<p>The schema definition for Company Model</p>

**Kind**: inner constant of [<code>company</code>](#app.models.module_company)  
<a name="app.models.module_company..CompanyModel"></a>

### company~CompanyModel : <code>model</code>

<p>Generated Company Model</p>

**Kind**: inner constant of [<code>company</code>](#app.models.module_company)  
<a name="app.models.module_event"></a>

## event

<p>Event Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [event](#app.models.module_event)
  - [~type](#app.models.module_event..type)
  - [~EventSchema](#app.models.module_event..EventSchema) : <code>Schema</code>
  - [~EventModel](#app.models.module_event..EventModel) : <code>model</code>

<a name="app.models.module_event..type"></a>

### event~type

<p>[0 - Club, 1 - Institute, 2 - Fest, 3 - Holiday]</p>

**Kind**: inner property of [<code>event</code>](#app.models.module_event)  
<a name="app.models.module_event..EventSchema"></a>

### event~EventSchema : <code>Schema</code>

<p>The schema definition for Event Model</p>

**Kind**: inner constant of [<code>event</code>](#app.models.module_event)  
<a name="app.models.module_event..EventModel"></a>

### event~EventModel : <code>model</code>

<p>Generated Event Model</p>

**Kind**: inner constant of [<code>event</code>](#app.models.module_event)  
<a name="app.models.forum.module_message"></a>

## message

<p>Forum Message Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [message](#app.models.forum.module_message)
  - [~anonymous](#app.models.forum.module_message..anonymous)
  - [~ForumMessageSchema](#app.models.forum.module_message..ForumMessageSchema) : <code>Schema</code>
  - [~ForumMessageModel](#app.models.forum.module_message..ForumMessageModel) : <code>model</code>

<a name="app.models.forum.module_message..anonymous"></a>

### message~anonymous

<p>Additional permission required</p>

**Kind**: inner property of [<code>message</code>](#app.models.forum.module_message)  
<a name="app.models.forum.module_message..ForumMessageSchema"></a>

### message~ForumMessageSchema : <code>Schema</code>

<p>The schema definition for Forum Message Model</p>

**Kind**: inner constant of [<code>message</code>](#app.models.forum.module_message)  
<a name="app.models.forum.module_message..ForumMessageModel"></a>

### message~ForumMessageModel : <code>model</code>

<p>Generated Forum Message Model</p>

**Kind**: inner constant of [<code>message</code>](#app.models.forum.module_message)  
<a name="app.models.forum.module_thread"></a>

## thread

<p>Forum Thread Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [thread](#app.models.forum.module_thread)
  - [~anonymous](#app.models.forum.module_thread..anonymous)
  - [~threadStatus](#app.models.forum.module_thread..threadStatus)
  - [~ForumThreadSchema](#app.models.forum.module_thread..ForumThreadSchema) : <code>Schema</code>
  - [~ForumThreadModel](#app.models.forum.module_thread..ForumThreadModel) : <code>model</code>

<a name="app.models.forum.module_thread..anonymous"></a>

### thread~anonymous

<p>Additional permission required</p>

**Kind**: inner property of [<code>thread</code>](#app.models.forum.module_thread)  
<a name="app.models.forum.module_thread..threadStatus"></a>

### thread~threadStatus

<p>[0 - Pending Moderation, 1 - Open, 2 - Closed]</p>

**Kind**: inner property of [<code>thread</code>](#app.models.forum.module_thread)  
<a name="app.models.forum.module_thread..ForumThreadSchema"></a>

### thread~ForumThreadSchema : <code>Schema</code>

<p>The schema definition for Forum Thread Model</p>

**Kind**: inner constant of [<code>thread</code>](#app.models.forum.module_thread)  
<a name="app.models.forum.module_thread..ForumThreadModel"></a>

### thread~ForumThreadModel : <code>model</code>

<p>Generated Forum Thread Model</p>

**Kind**: inner constant of [<code>thread</code>](#app.models.forum.module_thread)  
<a name="app.module_models"></a>

## models

<p>MongoDB Models</p>

**Requires**: <code>module:app.models.user</code>, <code>module:app.models.role</code>, <code>module:app.models.club</code>, <code>module:app.models.event</code>, <code>module:app.models.categoryMap</code>, <code>module:app.models.tag</code>, <code>module:app.models.media</code>, <code>module:app.models.album</code>, <code>module:app.models.article</code>, <code>module:app.models.comment</code>, <code>module:app.models.reaction</code>, <code>module:app.models.issue</code>, <code>module:app.models.session</code>, <code>module:app.models.squiggle</code>, <code>module:app.models.company</code>, <code>module:app.models.live</code>, <code>module:app.models.shareInternship</code>, <code>module:app.models.forum.thread</code>, <code>module:app.models.forum.message</code>, <code>module:app.models.poll</code>  
**Since**: 0.1.0  
**Version**: 0.1.0

- [models](#app.module_models)
  - [.Model](#app.module_models.Model) : <code>Model</code>
  - [.UserModel](#app.module_models.UserModel) : <code>Model</code>
  - [.RoleModel](#app.module_models.RoleModel) : <code>Model</code>
  - [.ClubModel](#app.module_models.ClubModel) : <code>Model</code>
  - [.EventModel](#app.module_models.EventModel) : <code>Model</code>
  - [.CategoryMapModel](#app.module_models.CategoryMapModel) : <code>Model</code>
  - [.TagModel](#app.module_models.TagModel) : <code>Model</code>
  - [.MediaModel](#app.module_models.MediaModel) : <code>Model</code>
  - [.AlbumModel](#app.module_models.AlbumModel) : <code>Model</code>
  - [.ArticleModel](#app.module_models.ArticleModel) : <code>Model</code>
  - [.CommentModel](#app.module_models.CommentModel) : <code>Model</code>
  - [.ReactionModel](#app.module_models.ReactionModel) : <code>Model</code>
  - [.IssueModel](#app.module_models.IssueModel) : <code>Model</code>
  - [.SessionModel](#app.module_models.SessionModel)
  - [.SquiggleModel](#app.module_models.SquiggleModel) : <code>Model</code>
  - [.CompanyModel](#app.module_models.CompanyModel) : <code>Model</code>
  - [.LiveModel](#app.module_models.LiveModel) : <code>Model</code>
  - [.ShareInternshipModel](#app.module_models.ShareInternshipModel) : <code>Model</code>
  - [.ForumThreadModel](#app.module_models.ForumThreadModel) : <code>Model</code>
  - [.ForumMessageModel](#app.module_models.ForumMessageModel) : <code>Model</code>
  - [.PollModel](#app.module_models.PollModel) : <code>Model</code>

<a name="app.module_models.Model"></a>

### models.Model : <code>Model</code>

<p>Prototype Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
<a name="app.module_models.UserModel"></a>

### models.UserModel : <code>Model</code>

<p>User Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.user  
<a name="app.module_models.RoleModel"></a>

### models.RoleModel : <code>Model</code>

<p>Role Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.role  
<a name="app.module_models.ClubModel"></a>

### models.ClubModel : <code>Model</code>

<p>Club Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.club  
<a name="app.module_models.EventModel"></a>

### models.EventModel : <code>Model</code>

<p>Event Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.event  
<a name="app.module_models.CategoryMapModel"></a>

### models.CategoryMapModel : <code>Model</code>

<p>Category Map Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.categoryMap  
<a name="app.module_models.TagModel"></a>

### models.TagModel : <code>Model</code>

<p>Tag Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.tag  
<a name="app.module_models.MediaModel"></a>

### models.MediaModel : <code>Model</code>

<p>Media Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.media  
<a name="app.module_models.AlbumModel"></a>

### models.AlbumModel : <code>Model</code>

<p>Album Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.album  
<a name="app.module_models.ArticleModel"></a>

### models.ArticleModel : <code>Model</code>

<p>Article Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.article  
<a name="app.module_models.CommentModel"></a>

### models.CommentModel : <code>Model</code>

<p>Comment Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.comment  
<a name="app.module_models.ReactionModel"></a>

### models.ReactionModel : <code>Model</code>

<p>Reaction Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.reaction  
<a name="app.module_models.IssueModel"></a>

### models.IssueModel : <code>Model</code>

<p>Issue Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.issue  
<a name="app.module_models.SessionModel"></a>

### models.SessionModel

<p>Session Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.session  
<a name="app.module_models.SquiggleModel"></a>

### models.SquiggleModel : <code>Model</code>

<p>Squiggle Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.squiggle  
<a name="app.module_models.CompanyModel"></a>

### models.CompanyModel : <code>Model</code>

<p>Company Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.company  
<a name="app.module_models.LiveModel"></a>

### models.LiveModel : <code>Model</code>

<p>Live Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.live  
<a name="app.module_models.ShareInternshipModel"></a>

### models.ShareInternshipModel : <code>Model</code>

<p>Share Internship Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.shareInternship  
<a name="app.module_models.ForumThreadModel"></a>

### models.ForumThreadModel : <code>Model</code>

<p>Forum Thread Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.forum.thread  
<a name="app.module_models.ForumMessageModel"></a>

### models.ForumMessageModel : <code>Model</code>

<p>Forum Message Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.forum.message  
<a name="app.module_models.PollModel"></a>

### models.PollModel : <code>Model</code>

<p>Poll Model</p>

**Kind**: static constant of [<code>models</code>](#app.module_models)  
**See**: module:app.models.poll  
<a name="app.models.module_issue"></a>

## issue

<p>Issue Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [issue](#app.models.module_issue)
  - [~IssueSchema](#app.models.module_issue..IssueSchema) : <code>Schema</code>
  - [~IssueModel](#app.models.module_issue..IssueModel) : <code>model</code>

<a name="app.models.module_issue..IssueSchema"></a>

### issue~IssueSchema : <code>Schema</code>

<p>The schema definition for Issue Model</p>

**Kind**: inner constant of [<code>issue</code>](#app.models.module_issue)  
<a name="app.models.module_issue..IssueModel"></a>

### issue~IssueModel : <code>model</code>

<p>Generated Issue Model</p>

**Kind**: inner constant of [<code>issue</code>](#app.models.module_issue)  
<a name="app.models.module_live"></a>

## live

<p>Live Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [live](#app.models.module_live)
  - [~type](#app.models.module_live..type)
  - [~benefits](#app.models.module_live..benefits)
  - [~LiveSchema](#app.models.module_live..LiveSchema) : <code>Schema</code>
  - [~LiveModel](#app.models.module_live..LiveModel) : <code>model</code>

<a name="app.models.module_live..type"></a>

### live~type

<p>[0-3 - Category 0-3, 4 - Internship]</p>

**Kind**: inner property of [<code>live</code>](#app.models.module_live)  
<a name="app.models.module_live..benefits"></a>

### live~benefits

<p>For type 4 - Add internship duration</p>

**Kind**: inner property of [<code>live</code>](#app.models.module_live)  
<a name="app.models.module_live..LiveSchema"></a>

### live~LiveSchema : <code>Schema</code>

<p>The schema definition for Live Model</p>

**Kind**: inner constant of [<code>live</code>](#app.models.module_live)  
<a name="app.models.module_live..LiveModel"></a>

### live~LiveModel : <code>model</code>

<p>Generated Live Model</p>

**Kind**: inner constant of [<code>live</code>](#app.models.module_live)  
<a name="app.models.module_media"></a>

## media

<p>Media Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [media](#app.models.module_media)
  - [~type](#app.models.module_media..type)
  - [~blurhash](#app.models.module_media..blurhash)
  - [~MediaSchema](#app.models.module_media..MediaSchema) : <code>Schema</code>
  - [~MediaModel](#app.models.module_media..MediaModel) : <code>model</code>

<a name="app.models.module_media..type"></a>

### media~type

<p>[0 - Image, 1 - Video]</p>

**Kind**: inner property of [<code>media</code>](#app.models.module_media)  
<a name="app.models.module_media..blurhash"></a>

### media~blurhash

<p>Only if type is 0</p>

**Kind**: inner property of [<code>media</code>](#app.models.module_media)  
<a name="app.models.module_media..MediaSchema"></a>

### media~MediaSchema : <code>Schema</code>

<p>The schema definition for Media Model</p>

**Kind**: inner constant of [<code>media</code>](#app.models.module_media)  
<a name="app.models.module_media..MediaModel"></a>

### media~MediaModel : <code>model</code>

<p>Generated Media Model</p>

**Kind**: inner constant of [<code>media</code>](#app.models.module_media)  
<a name="app.models.module_poll"></a>

## poll

<p>Poll Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [poll](#app.models.module_poll)
  - [~PollSchema](#app.models.module_poll..PollSchema) : <code>Schema</code>
  - [~PollModel](#app.models.module_poll..PollModel) : <code>model</code>

<a name="app.models.module_poll..PollSchema"></a>

### poll~PollSchema : <code>Schema</code>

<p>The schema definition for Poll Model</p>

**Kind**: inner constant of [<code>poll</code>](#app.models.module_poll)  
<a name="app.models.module_poll..PollModel"></a>

### poll~PollModel : <code>model</code>

<p>Generated Poll Model</p>

**Kind**: inner constant of [<code>poll</code>](#app.models.module_poll)  
<a name="app.models.module_reaction"></a>

## reaction

<p>Reaction Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [reaction](#app.models.module_reaction)
  - [~type](#app.models.module_reaction..type)
  - [~ReactionSchema](#app.models.module_reaction..ReactionSchema) : <code>Schema</code>
  - [~ReactionModel](#app.models.module_reaction..ReactionModel) : <code>model</code>

<a name="app.models.module_reaction..type"></a>

### reaction~type

<p>[0 - Like, 1 - Upvote]</p>

**Kind**: inner property of [<code>reaction</code>](#app.models.module_reaction)  
<a name="app.models.module_reaction..ReactionSchema"></a>

### reaction~ReactionSchema : <code>Schema</code>

<p>The schema definition for Reaction Model</p>

**Kind**: inner constant of [<code>reaction</code>](#app.models.module_reaction)  
<a name="app.models.module_reaction..ReactionModel"></a>

### reaction~ReactionModel : <code>model</code>

<p>Generated Reaction Model</p>

**Kind**: inner constant of [<code>reaction</code>](#app.models.module_reaction)  
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
<a name="app.models.module_session"></a>

## session

<p>Session Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [session](#app.models.module_session)
  - [~position](#app.models.module_session..position)
  - [~team](#app.models.module_session..team)
  - [~SessionSchema](#app.models.module_session..SessionSchema) : <code>Schema</code>
  - [~SessionModel](#app.models.module_session..SessionModel) : <code>model</code>

<a name="app.models.module_session..position"></a>

### session~position

<p>[0 - Member, 1 - Coordinator, 2 - Mentor]</p>

**Kind**: inner property of [<code>session</code>](#app.models.module_session)  
<a name="app.models.module_session..team"></a>

### session~team

<p>[0 - Content, 1 - Photography, 2 - Design, 3 - Technical]</p>

**Kind**: inner property of [<code>session</code>](#app.models.module_session)  
<a name="app.models.module_session..SessionSchema"></a>

### session~SessionSchema : <code>Schema</code>

<p>The schema definition for Session Model</p>

**Kind**: inner constant of [<code>session</code>](#app.models.module_session)  
<a name="app.models.module_session..SessionModel"></a>

### session~SessionModel : <code>model</code>

<p>Generated Session Model</p>

**Kind**: inner constant of [<code>session</code>](#app.models.module_session)  
<a name="app.models.module_shareInternships"></a>

## shareInternships

<p>Share Internship Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [shareInternships](#app.models.module_shareInternships)
  - [~duration](#app.models.module_shareInternships..duration)
  - [~ShareInternshipSchema](#app.models.module_shareInternships..ShareInternshipSchema) : <code>Schema</code>
  - [~ShareInternshipModel](#app.models.module_shareInternships..ShareInternshipModel) : <code>model</code>

<a name="app.models.module_shareInternships..duration"></a>

### shareInternships~duration

<p>Written in weeks</p>

**Kind**: inner property of [<code>shareInternships</code>](#app.models.module_shareInternships)  
<a name="app.models.module_shareInternships..ShareInternshipSchema"></a>

### shareInternships~ShareInternshipSchema : <code>Schema</code>

<p>The schema definition for Share Internship Model</p>

**Kind**: inner constant of [<code>shareInternships</code>](#app.models.module_shareInternships)  
<a name="app.models.module_shareInternships..ShareInternshipModel"></a>

### shareInternships~ShareInternshipModel : <code>model</code>

<p>Generated Share Internship Model</p>

**Kind**: inner constant of [<code>shareInternships</code>](#app.models.module_shareInternships)  
<a name="app.models.module_squiggle"></a>

## squiggle

<p>Squiggle Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [squiggle](#app.models.module_squiggle)
  - [~SquiggleSchema](#app.models.module_squiggle..SquiggleSchema) : <code>Schema</code>
  - [~SquiggleModel](#app.models.module_squiggle..SquiggleModel) : <code>model</code>

<a name="app.models.module_squiggle..SquiggleSchema"></a>

### squiggle~SquiggleSchema : <code>Schema</code>

<p>The schema definition for Squiggle Model</p>

**Kind**: inner constant of [<code>squiggle</code>](#app.models.module_squiggle)  
<a name="app.models.module_squiggle..SquiggleModel"></a>

### squiggle~SquiggleModel : <code>model</code>

<p>Generated Squiggle Model</p>

**Kind**: inner constant of [<code>squiggle</code>](#app.models.module_squiggle)  
<a name="app.models.module_tag"></a>

## tag

<p>Tag Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [tag](#app.models.module_tag)
  - [~TagModel](#app.models.module_tag..TagModel) : <code>Schema</code>
  - [~TagModel](#app.models.module_tag..TagModel) : <code>model</code>

<a name="app.models.module_tag..TagModel"></a>

### tag~TagModel : <code>Schema</code>

<p>The schema definition for Tag Model</p>

**Kind**: inner constant of [<code>tag</code>](#app.models.module_tag)  
<a name="app.models.module_tag..TagModel"></a>

### tag~TagModel : <code>model</code>

<p>Generated Tag Model</p>

**Kind**: inner constant of [<code>tag</code>](#app.models.module_tag)  
<a name="app.models.module_user"></a>

## user

<p>User Model</p>

**Requires**: <code>module:mongoose.Schema</code>, <code>module:mongoose.model</code>  
**Since**: 0.1.0  
**Version**: schema:v1

- [user](#app.models.module_user)
  - [~verifiedType](#app.models.module_user..verifiedType)
  - [~profile](#app.models.module_user..profile)
    - [.github](#app.models.module_user..profile.github)
  - [~positionType](#app.models.module_user..positionType)
  - [~team](#app.models.module_user..team)
  - [~lastPoll](#app.models.module_user..lastPoll)
  - [~UserSchema](#app.models.module_user..UserSchema) : <code>Schema</code>
  - [~UserModel](#app.models.module_user..UserModel) : <code>model</code>

<a name="app.models.module_user..verifiedType"></a>

### user~verifiedType

<p>[0 - Normal, 1 - NITR Student, 2 - MM, 3 - NITR Faculty]</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..profile"></a>

### user~profile

<p>Only For MM &amp; NITR Faculty</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..profile.github"></a>

#### profile.github

<p>Only For MM Tech Team</p>

**Kind**: static property of [<code>profile</code>](#app.models.module_user..profile)  
<a name="app.models.module_user..positionType"></a>

### user~positionType

<p>[0 - Member, 1 - Coordinator, 2 - Mentor]</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..team"></a>

### user~team

<p>[0 - Content, 1 - Photography, 2 - Design, 3 - Technical]</p>

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
<a name="app.models.module_user..lastPoll"></a>

### user~lastPoll

**Kind**: inner property of [<code>user</code>](#app.models.module_user)  
**See**: module:app.models.poll  
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
