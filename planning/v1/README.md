# APIs

## Landing Page

| Operation | Type | Description |
|--|--|--|
| List Featured Posts | Read | Get overview of top 5 |
| List Editor's Picks | Read | Get overview of editor's picks |
| List Articles This Issue | Read | Get overview of all articles |
| Get Squiggle | Read | Get latest squiggle |
| Get Pulse | Read | Get latest pulse |
| Vote Pulse | Write | Submit user vote for latest pulse |
| Get Calendar Events | Read | Get all events' overview this month |
| List Single Witsdom | Read | Get single witsdom article overview |
| List Single Photostory | Read | Get single photostory article overview |
| Get Instagram Feed | Read | Get latest instagram grid |
| Get YouTube Feed | Read | Get latest youtube videos |
| Get Trending Categories | Read | Get highest viewed categories |
| Get User Profile | Read | Get user's auth status and profile info |

## Article Page

| Operation | Type | Description |
|--|--|--|
| Get Article | Read+Write | Get entire article and increase hit count |
| Get Reactions | Read | Get all reaction data |
| Get Comments | Read | Get all comments data |
| Toggle Reaction | Write | Add or remove user's rection |
| Add Comment | Write | Add user's comment |
| List Recommendations | Read | Get user and article based recommendations |
| Toggle Bookmark | Write | Add or remove user's bookmark |
| Add View | Write | Increase view count (time delay based, async) |

## Category Page

| Operation | Type | Description |
|--|--|--|
| List Articles | Read | Get overview of latest articles in the category |
| List Trending | Read | Get overview of trending articles in the category |

## Expressions Page

| Operation | Type | Description |
|--|--|--|
| Get Witsdom Article | Read | Get single witsdom article |
| List Witsdom Articles | Read | Get overview of witsdom articles |
| Get Photostory Article | Read | Get single photostory article |
| List Photostory Articles | Read | Get overview of photostory articles |
| Get Gallery | Read | Get single gallery album |
| List Gallery | Read | Get overview of gallery albums |
| Get Podcasts | Read | Get spotify embedding link |

## Calendar Page

| Operation | Type | Description |
|--|--|--|
| Get Event | Read | Get single event details |

## Search Page

| Operation | Type | Description |
|--|--|--|
| Get Search | Read | List articles matching search term |
| Get Autocomplete | Read | List of suggestions for search autocomplete |

## Profile Page

| Operation | Type | Description |
|--|--|--|
| Write Details | Write | Update user profile information |
| User Activity | Read | Retrieve all user activity |
| Update Interests | Write | Update user's interests |
| Subscribe Newsletter | Write | Add user to subscriber list |
| Verify Account | Write | Verify user's NITR account |

## About Page

| Operation | Type | Description |
|--|--|--|
| Get About Us | Read | -- |
| Get Team | Read | -- |
| Get Projects | Read | -- |

## Information Page

| Operation | Type | Description |
|--|--|--|
| Get Static Info | Read | -- |
| Get Print Issues | Read | -- |
| Get Archive | Read | -- |
| Get Contact Info | Read | -- |
| Get TOS & PP Links | Read | -- |

## Forum Page

| Operation | Type | Description |
|--|--|--|
| List Threads | Read | -- |
| Get Thread | Read | -- |
| Get Reactions | Read | -- |
| Get Comments | Read | -- |
| Create Thread | Write | -- |
| Add Comment | Write | Thread/Comment |
| Toggle Reaction | Write | Thread/Comment |

## Admin Page

| Operation | Type | Description |
|--|--|--|
| Update Project | Write | -- |
| Update About Us | Write | -- |
| Update Team | Write | -- |
| Update Static Info | Write | -- |
| Update Contact Info | Write | -- |
| Update TOS & PP Links | Write | -- |
| Add Print Issue | Write | -- |
| Update Print Issue | Write | -- |
| Delete Print Issue | Write | -- |
| Add Article | Write | -- |
| Update Article | Write | -- |
| Delete Article | Write | -- |
| Add Squiggle | Write | -- |
| Update Squiggle | Write | -- |
| Delete Squiggle | Write | -- |
| Add Poll | Write | -- |
| Update Poll | Write | -- |
| Delete Poll | Write | -- |
| Moderate Commnet | Write | Approve/Reject|
| Add Issues | Write | -- |
| Update Issues | Write | -- |
| Delete Issues | Write | -- |
| Add Session | Write | -- |
| Update Session | Write | -- |
| Delete Session | Write | -- |
| Add Editor's Picks | Write | -- |
| Update Editor's Picks | Write | -- |
| Delete Editor's Picks | Write | -- |
| Add Events | Write | -- |
| Update Events | Write | -- |
| Delete Events | Write | -- |
| Update Youtube List | Write | -- |
| Update Instagram Posts | Write | -- |

---

# Collection Relationships
![Collection Relationship](collectionRelationship.svg)

---

# Models
![Models](models.png)
