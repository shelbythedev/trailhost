# TrailHost API

TrailHost is a community-supported store of off-road trail data.

**Currently in development, thus no stable or test version yet.**

## Sections

* [Technical Information](#technical-information)

* [Documentation](#documentation)

  * [Become a Client](#become-a-client)

  * [Client](#client)

    * [Token](#token)

    * [Get Client](#get-client)

    * [Update Client](#update-client)

  * [User](#user)

    * [Create User](#create-user)

## Technical Information
### API URLs

| Type | URL |
| ------ | ------ |
| Production | TBD |
| Test | https://trailhost-test.herokuapp.com |

### Versions

| Version | URL | Changelog |
| ----- | ------ | ------ |
| v 1.0.0 (test) | https://trailhost-test.herokuapp.com | Currently in development |

# Documentation
### Become a Client
To have access to TrailHost, you must be a client. [Contact us](mailto:shelby@shelbysolomon.net) for access. Upon account creation, you will receive authentication UID and SECRET keys for token generation. Your token expires every 24 hours and must be renewed. Always store these outside your application.

## Client

Clients are representative objects of applications which use/contribute to TrailHost. Any application who wishes to access our API must have a Client.

```
  Client = {
              name: String,
              uid: String,
              secret: String,
              token: String
            }
```

### Token

  Returns `Token` object based on Client's UID and SECRET. Tokens expire every 24 hours and must be renewed.

  * URL

    `POST /client/token`

  * Request Headers

    ```
      uid    : [String],
      secret : [String]
    ```

  * Request Body

    *None*

  * Sample Response
    ```javascript
      {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoiMjAxNy0wNy0wNVQxNzowNzo1MS4yOTRaIn0.dDIeUGZ52xVDrUXa5itPzTgmPfQxmfbWs-E8iXF0h1A"
      }
    ```

### Get Client

  Returns current `Client` object in session.

  * URL

    `GET /client/`

  * Request Headers

    ```
      token : [String],
    ```

  * Request Body

    *None*

  * Sample Response
    ```javascript
      {
        "_id": "595d02c93cd0130428d59d84",
        "name": "My Client",
        "uid": "b3eed842-f73e-45ec-84a6-ecb20eb4c6f2",
        "secret": "e96c1c40-6194-11e7-aa2f-47fc3614a99d",
        "__v": 0,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoiMjAxNy0wNy0wNVQxOToxNjo1NC41MzBaIn0.AR3AvGp9oRAaxk107Rtxt4WnfsjYkfHnMcDJxQj_bwo"
      }
    ```

### Update Client

  Updates current `Client` object in session.

  **NOTE: Only** `Client["name"]` **may be updated.**

  * URL

    `PUT /client/`

  * Request Headers

    ```
      token : [String],
    ```

  * Request Body

    ```javascript
      {
        "name": "Updated Client Name"
      }
    ```

  * Sample Response
    ```javascript
      {
        "_id": "595d02c93cd0130428d59d84",
        "name": "Updated Client Name",
        "uid": "b3eed842-f73e-45ec-84a6-ecb20eb4c6f2",
        "secret": "e96c1c40-6194-11e7-aa2f-47fc3614a99d",
        "__v": 0,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoiMjAxNy0wNy0wNVQxOToxNjo1NC41MzBaIn0.AR3AvGp9oRAaxk107Rtxt4WnfsjYkfHnMcDJxQj_bwo"
      }
    ```

## User

Any end-user which contributes to TrailHost must have an User account.

**Note:** TrailHost does NOT manage user account data, such as passwords or login information. We only store a User's alias (should be relational to user account on Client's application), submission count, and timestamp of when the User object was created.

```
  User = {
            alias: String,
            submission_count: Integer,
            created_at: ISO Timestamp
          }
```

### Create User

  Creates new `User` object.

  **NOTE: Only accepts** `User["alias"]`**, which should be the user's screen name.**

  * URL

    `POST /user/`

  * Request Headers

    ```
      token : [String],
    ```

  * Request Body

    ```javascript
      {
        "alias": "my_user_name"
      }
    ```

  * Sample Response
    ```javascript
      {
        "alias": "my_user_name",
        "client_id": "595d02c93cd0130428d59d84",
        "_id": "5963b58048a2890629fd645e",
        "created_at": "2017-07-10T15:33:49.004Z",
        "submission_count": 0
      }
    ```
