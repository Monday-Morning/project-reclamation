# Permissions

## User Section

| Permission Name   | Description                     | Admin |
| ----------------- | ------------------------------- | ----- |
| user.read.private | Can read non-public users' data | false |
| user.read.admin   | Can read users' admin fields    | true  |
| user.write.self   | Can update own account          | false |
| user.write.all    | Can update all user data        | true  |

---

## Article Section

| Permission Name          | Description                                        | Admin |
| ------------------------ | -------------------------------------------------- | ----- |
| article.read.restricted  | Can read institute restricted articles             | false |
| article.read.unpublished | Can read unpublished, archived or trashed articles | true  |
| article.read.admin       | Can read admin fields of an article                | true  |
| article.write.new        | Can write a new article                            | true  |
| article.write.self       | Can update own articles                            | true  |
| article.write.all        | Can update all articles                            | true  |
| article.approve.all      | Can approve all articles                           | true  |

---

## Reactions Section

| Permission Name      | Description                  | Admin |
| -------------------- | ---------------------------- | ----- |
| reactions.write.self | Can add/remove a reaction    | false |
| reactions.write.all  | Can add/remove all reactions | true  |

---

## Comment Section

| Permission Name         | Description                    | Admin |
| ----------------------- | ------------------------------ | ----- |
| comment.read.public     | Can read public comments       | false |
| comment.read.unapproved | Can read unapproved comments   | true  |
| comment.write.new       | Can write a new comment        | false |
| comment.write.approved  | Can write pre-appoved comments | false |
| comment.write.self      | Can update/delete own comments | false |
| comment.write.delete    | Can delete all comments        | true  |
| comment.approve.all     | Can approve all comments       | true  |

---

## Issue Section

| Permission Name        | Description                       | Admin |
| ---------------------- | --------------------------------- | ----- |
| issue.read.unpublished | Can read unpublished issues       | true  |
| issue.read.admin       | Can read admin fields of an issue | true  |
| issue.write.new        | Can create a new issue            | true  |
| issue.write.all        | Can update all issues             | true  |
| issue.write.delete     | Can delete all issues             | true  |

---

## Session Section

| Permission Name      | Description                 | Admin |
| -------------------- | --------------------------- | ----- |
| session.write.new    | Can create a new session    | true  |
| session.write.all    | Can edit all session data   | true  |
| session.write.delete | Can delete all session data | true  |

---

## Squiggle Section

| Permission Name       | Description                | Admin |
| --------------------- | -------------------------- | ----- |
| squiggle.write.all    | Can add/edit all squiggles | true  |
| squiggle.write.delete | Can delete all squiggles   | true  |

---

## Poll Section

| Permission Name       | Description                               | Admin |
| --------------------- | ----------------------------------------- | ----- |
| poll.write.restricted | Can respond to institute restricted polls | false |
| poll.write.all        | Can add/edit all polls                    | true  |
| poll.write.delete     | Can delete all polls                      | true  |

---

## Media Section

| Permission Name    | Description                   | Admin |
| ------------------ | ----------------------------- | ----- |
| media.write.all    | Can add/update all media data | true  |
| media.write.delete | Can delete all media data     | true  |

---

## Album Section

| Permission Name | Description                          | Admin |
| --------------- | ------------------------------------ | ----- |
| album.write.all | Can add/update/delete all album data | true  |

---

## Tag Section

| Permission Name  | Description                   | Admin |
| ---------------- | ----------------------------- | ----- |
| tag.read.admin   | Can read admin tags           | true  |
| tag.write.public | Can create/update public tags | true  |
| tag.write.admin  | Can create/update admin tags  | true  |
| tag.write.delete | Can delete all tags           | true  |

---

## Category Map Section

| Permission Name    | Description                             | Admin |
| ------------------ | --------------------------------------- | ----- |
| category.write.all | Can add/update/delete all category data | true  |

---

## Role Section

| Permission Name | Description                         | Admin |
| --------------- | ----------------------------------- | ----- |
| role.write.all  | Can add/update/delete all role data | true  |

---

## Club Section

| Permission Name   | Description                  | Admin |
| ----------------- | ---------------------------- | ----- |
| club.write.all    | Can add/update all club data | true  |
| club.write.delete | Can delete all club data     | true  |

---

## Event Section

| Permission Name | Description                          | Admin |
| --------------- | ------------------------------------ | ----- |
| event.write.all | Can add/update/delete all event data | true  |

---

## Company Section

| Permission Name         | Description                                | Admin |
| ----------------------- | ------------------------------------------ | ----- |
| company.read.public     | Can read public company data               | false |
| company.read.restricted | Can read institute restricted company data | false |
| company.read.private    | Can read private company data              | true  |
| company.write.new       | Can add new company data                   | true  |
| company.write.all       | Can add/update all company data            | true  |
| company.write.delete    | Can delete all company data                | true  |

---

## Live Section

| Permission Name      | Description                             | Admin |
| -------------------- | --------------------------------------- | ----- |
| live.read.public     | Can read public live data               | false |
| live.read.restricted | Can read institute restricted live data | false |
| live.read.private    | Can read private live data              | true  |
| live.write.new       | Can add new live data                   | true  |
| live.write.all       | Can add/update/delete all live data     | true  |

---

## Share Internship Section

| Permission Name                 | Description                                        | Admin |
| ------------------------------- | -------------------------------------------------- | ----- |
| shareInternship.read.public     | Can read public shareInternship data               | false |
| shareInternship.read.restricted | Can read institute restricted shareInternship data | false |
| shareInternship.read.unapproved | Can read unapproved shareInternship data           | true  |
| shareInternship.write.new       | Can add new shareInternship data                   | false |
| shareInternship.write.all       | Can add/update/delete all shareInternship data     | true  |
| shareInternship.approve.all     | Can approve all shareInternship data               | true  |

---

## Forum Thread Section

| Permission Name             | Description                                 | Admin |
| --------------------------- | ------------------------------------------- | ----- |
| forumThread.read.public     | Can read public forum threads               | false |
| forumThread.read.restricted | Can read institute restricted forum threads | false |
| forumThread.read.unapproved | Can read unapproved forum threads           | true  |
| forumThread.write.new       | Can create a new forum thread               | false |
| forumThread.write.approved  | Can create pre-approved forum threads       | false |
| forumThread.write.self      | Can update own forum threads                | false |
| forumThread.write.all       | Can update all forum threads                | true  |
| forumThread.write.delete    | Can delete all forum threads                | true  |
| forumThread.approve.all     | Can approve all forum threads               | true  |

---

## Forum Message Section

| Permission Name              | Description                            | Admin |
| ---------------------------- | -------------------------------------- | ----- |
| forumMessage.read.public     | Can read public forum messages         | false |
| forumMessage.read.unapproved | Can read unapproved forum messages     | true  |
| forumMessage.write.new       | Can create a new forum message         | false |
| forumMessage.write.approved  | Can create pre-approved forum messages | false |
| forumMessage.write.self      | Can update own forum messages          | false |
| forumMessage.write.delete    | Can delete all forum messages          | true  |
| forumMessage.approve.all     | Can approve all forum messages         | true  |
