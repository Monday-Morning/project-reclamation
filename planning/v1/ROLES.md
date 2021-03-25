# Roles and Permissions

## User Section

### Permissions

| Permissions Name | Description | 
|--|--|
| user.read.public | Can read entire public accounts and public fields of private accounts |
| user.read.all | Can read all user data |
| user.list.public | Can list/search all public accounts |
| user.list.all | Can list/search all user data |
| user.write.self | Can update/delete own account |
| user.write.all | Can create/update/delete all user data |
|  |  |

### Roles

| Role Name | user.read.public | user.read.all | user.list.public | user.list.all | user.write.self | user.write.all |
|--|--|--|--|--|--|--|
| user.basic | Y | N | Y | N | Y | N |
| user.verified | Y | Y | Y | N | Y | N |
| user.admin | Y | Y | Y | Y | Y | N |
| user.superadmin | Y | Y | Y | Y | Y | Y |
|  |  |  |  |  |  |  |
