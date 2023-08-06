# Permissions

## User Section

| Role Name       | user.read.private | user.read.admin | user.write.self | user.write.all |
| --------------- | ----------------- | --------------- | --------------- | -------------- |
| user.basic      | true              | false           | true            | false          |
| user.verified   | true              | false           | true            | false          |
| user.admin      | true              | true            | true            | false          |
| user.superadmin | true              | true            | true            | true           |

---

## Article Section

| Role Name          | article.read.restricted | article.read.unpublished | article.read.admin | article.write.new | article.write.self | article.write.all | article.approve.all |
| ------------------ | ----------------------- | ------------------------ | ------------------ | ----------------- | ------------------ | ----------------- | ------------------- |
| article.basic      | false                   | false                    | false              | false             | false              | false             | false               |
| article.student    | true                    | false                    | false              | false             | false              | false             | false               |
| article.faculty    | false                   | false                    | false              | false             | false              | false             | false               |
| article.team       | true                    | true                     | true               | true              | true               | false             | false               |
| article.admin      | true                    | true                     | true               | true              | true               | true              | true                |
| article.superadmin | true                    | true                     | true               | true              | true               | true              | true                |

---

## Reactions Section

| Role Name            | reactions.write.self | reactions.write.all |
| -------------------- | -------------------- | ------------------- |
| reactions.basic      | true                 | false               |
| reactions.admin      | true                 | false               |
| reactions.superadmin | true                 | true                |

_TODO: Consider combining reaction permissions in comment roles_

---

## Comment Section

| Role Name          | comment.read.public | comment.read.unapproved | comment.write.new | comment.write.approved | comment.write.self | comment.write.delete | comment.approve.all |
| ------------------ | ------------------- | ----------------------- | ----------------- | ---------------------- | ------------------ | -------------------- | ------------------- |
| comment.basic      | true                | false                   | true              | false                  | true               | false                | false               |
| comment.verified   | true                | false                   | true              | true                   | true               | false                | false               |
| comment.admin      | true                | true                    | true              | true                   | true               | false                | true                |
| comment.superadmin | true                | true                    | true              | true                   | true               | true                 | true                |

---

## Issue Section

| Role Name        | issue.read.unpublished | issue.read.admin | issue.write.new | issue.write.all | issue.write.delete |
| ---------------- | ---------------------- | ---------------- | --------------- | --------------- | ------------------ |
| issue.basic      | false                  | false            | false           | false           | false              |
| issue.team       | true                   | false            | false           | false           | false              |
| issue.admin      | true                   | true             | true            | true            | false              |
| issue.superadmin | true                   | true             | true            | true            | true               |

_TODO: Consider combining session and issue permissions in singular roles_

---

## Session Section

| Role Name          | session.write.new | session.write.all | session.write.delete |
| ------------------ | ----------------- | ----------------- | -------------------- |
| session.basic      | false             | false             | false                |
| session.admin      | false             | true              | false                |
| session.superadmin | true              | true              | true                 |

_TODO: Consider combining session and issue permissions in singular roles_

---

## Squiggle Section

| Role Name           | squiggle.read.all | squiggle.write.new | squiggle.write.all | squiggle.write.delete |
| ------------------- | ----------------- | ------------------ | ------------------ | --------------------- |
| squiggle.basic      | false             | false              | false              | false                 |
| squiggle.admin      | true              | true               | false              | false                 |
| squiggle.superadmin | true              | true               | true               | true                  |

---

## Poll Section

| Role Name       | poll.write.restricted | poll.write.all | poll.write.delete |
| --------------- | --------------------- | -------------- | ----------------- |
| poll.basic      | false                 | false          | false             |
| poll.verified   | true                  | false          | false             |
| poll.admin      | true                  | true           | false             |
| poll.superadmin | true                  | true           | true              |

---

## Media Section

| Role Name        | media.write.all | media.write.delete |
| ---------------- | --------------- | ------------------ |
| media.basic      | false           | false              |
| media.admin      | true            | false              |
| media.superadmin | true            | true               |

---

## Album Section

| Role Name        | album.write.all |
| ---------------- | --------------- |
| album.basic      | false           |
| album.admin      | true            |
| album.superadmin | true            |

_TODO: Consider combining album permissions in media roles_

---

## Tag Section

| Role Name      | tag.read.admin | tag.write.public | tag.write.admin | tag.write.delete |
| -------------- | -------------- | ---------------- | --------------- | ---------------- |
| tag.basic      | false          | false            | false           | false            |
| tag.admin      | true           | true             | true            | false            |
| tag.superadmin | true           | true             | true            | true             |

---

## Category Map Section

| Role Name           | category.write.all |
| ------------------- | ------------------ |
| category.basic      | false              |
| category.admin      | false              |
| category.superadmin | true               |

---

## Role Section

| Role Name       | role.write.all |
| --------------- | -------------- |
| role.basic      | false          |
| role.admin      | false          |
| role.superadmin | true           |

---

## Club Section

| Role Name       | club.write.all | club.write.delete |
| --------------- | -------------- | ----------------- |
| club.basic      | false          | false             |
| club.admin      | true           | false             |
| club.superadmin | true           | true              |

_TODO: Consider combining club and event permissions in singular roles_

---

## Event Section

| Role Name        | event.write.all |
| ---------------- | --------------- |
| event.basic      | false           |
| event.admin      | true            |
| event.superadmin | true            |

_TODO: Consider combining club and event permissions in singular roles_

---

## Company Section

| Role Name          | company.read.public | company.read.restricted | company.read.private | company.write.new | company.write.all | company.write.delete |
| ------------------ | ------------------- | ----------------------- | -------------------- | ----------------- | ----------------- | -------------------- |
| company.basic      | true                | false                   | false                | false             | false             | false                |
| company.verified   | true                | true                    | false                | false             | false             | false                |
| company.admin      | true                | true                    | true                 | true              | true              | false                |
| company.superadmin | true                | true                    | true                 | true              | true              | true                 |

_TODO: Consider combining company permissions in live roles_

---

## Live Section

| Role Name       | live.read.public | live.read.restricted | live.read.private | live.write.new | live.write.all |
| --------------- | ---------------- | -------------------- | ----------------- | -------------- | -------------- |
| live.basic      | true             | false                | false             | false          | false          |
| live.verified   | true             | true                 | false             | false          | false          |
| live.admin      | true             | true                 | true              | true           | true           |
| live.superadmin | true             | true                 | true              | true           | true           |

---

## Share Internship Section

| Role Name                  | shareInternship.read.public | shareInternship.read.restricted | shareInternship.read.unapproved | shareInternship.write.new | shareInternship.write.all | shareInternship.approve.all |
| -------------------------- | --------------------------- | ------------------------------- | ------------------------------- | ------------------------- | ------------------------- | --------------------------- |
| shareInternship.basic      | true                        | false                           | false                           | false                     | false                     | false                       |
| shareInternship.verified   | true                        | true                            | false                           | true                      | false                     | false                       |
| shareInternship.admin      | true                        | true                            | true                            | true                      | true                      | true                        |
| shareInternship.superadmin | true                        | true                            | true                            | true                      | true                      | true                        |

_TODO: Consider combining shareInternship permissions in live roles_

---

## Forum Thread Section

| Role Name        | forumThread.read.public | forumThread.read.restricted | forumThread.read.unapproved | forumThread.write.new | forumThread.write.approved | forumThread.write.self | forumThread.write.all | forumThread.write.delete | forumThread.approve.all |
| ---------------- | ----------------------- | --------------------------- | --------------------------- | --------------------- | -------------------------- | ---------------------- | --------------------- | ------------------------ | ----------------------- |
| forum.basic      | true                    | false                       | false                       | true                  | false                      | true                   | false                 | false                    | false                   |
| forum.verified   | true                    | true                        | false                       | true                  | true                       | true                   | false                 | false                    | false                   |
| forum.admin      | true                    | true                        | true                        | true                  | true                       | true                   | true                  | false                    | true                    |
| forum.superadmin | true                    | true                        | true                        | true                  | true                       | true                   | true                  | true                     | true                    |

---

## Forum Message Section

| Role Name        | forumMessage.read.public | forumMessage.read.unapproved | forumMessage.write.new | forumMessage.write.approved | forumMessage.write.self | forumMessage.write.delete | forumMessage.approve.all |
| ---------------- | ------------------------ | ---------------------------- | ---------------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ |
| forum.basic      | true                     | false                        | true                   | false                       | true                    | false                     | false                    |
| forum.verified   | true                     | false                        | true                   | true                        | true                    | false                     | false                    |
| forum.admin      | true                     | true                         | true                   | true                        | true                    | false                     | true                     |
| forum.superadmin | true                     | true                         | true                   | true                        | true                    | true                      | true                     |
