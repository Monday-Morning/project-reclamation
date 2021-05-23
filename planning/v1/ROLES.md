# Roles and Permissions

## User Section

### User Permissions

| Permissions Name | Description |
|--|--|
| user.read.public | Can read entire public accounts and public fields of private accounts |
| user.read.all | Can read all user data |
| user.list.public | Can list/search all public accounts |
| user.list.all | Can list/search all user data |
| user.write.self | Can update/delete own account |
| user.write.all | Can create/update/delete all user data |
|  |  |

### User Roles

| Role Name | user.read.public | user.read.all | user.list.public | user.list.all | user.write.self | user.write.all |
|--|--|--|--|--|--|--|
| user.basic | Y | N | Y | N | Y | N |
| user.verified | Y | Y | Y | N | Y | N |
| user.admin | Y | Y | Y | Y | Y | N |
| user.superadmin | Y | Y | Y | Y | Y | Y |
|  |  |  |  |  |  |  |

---

## Article Section

### Article Permissions

| Permissions Name | Description |
|--|--|
| article.read.private | Can read institute restricted articles |
| article.read.unpublished | Can read unpublished, archived or trashed articles |
| article.list.private | Can list/search institue restricted articles |
| article.list.unpublished | Can list/search unpublished, archived or trashed articles |
| article.write.new | Can create a new article |
| article.write.self | Can update/delete own articles |
| article.write.all | Can update/delete all articles |
|  |  |

### Article Roles

| Role Name | article.read.private | article.read.unpublished | article.list.private | article.list.unpublished | article.write.new | article.write.self | user.write.all |
|--|--|--|--|--|--|--|--|
| article.basic | N | N | N | N | N | N | N |
| article.verified | Y | N | Y | N | N | N | N |
| article.team | Y | Y | Y | Y | N | Y | N |
| article.author | Y | Y | Y | Y | Y | Y | N |
| article.admin | Y | Y | Y | Y | Y | Y | Y |
|  |  |  |  |  |  |  |  |
---

## Issue Section

### Issue Permissions

| Permissions Name | Description |
|--|--|
| issue.read.private | Can read institute restricted articles |
| issue.read.unpublished | Can read unpublished articles |
| issue.list.private | Can list/search institue restricted articles |
| issue.write.new | Can create a new article |
| issue.write.self | Can update/delete own articles |
| issue.write.all | Can update/delete all articles |
|  |  |

### Issue Roles

| Role Name | article.read.private | article.read.unpublished | article.list.private | article.write.new | article.write.self | user.write.all |
|--|--|--|--|--|--|--|
| article.basic | N | N | N | N | N | N |
| article.verified | Y | N | Y | N | N | N |
| article.team | Y | Y | Y | N | Y | N |
| article.author | Y | Y | Y | Y | Y | N |
| article.admin | Y | Y | Y | Y | Y | Y |
|  |  |  |  |  |  |  |
