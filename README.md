# TrailHost API

TrailHost is a community-supported store of off-road trail data.

**Currently in development, thus no stable or test version yet.**

## Sections

[Technical Information](#technical-information)

[Become a Client](#become-a-client)

## Technical Information
### API URLs

| Type | URL |
| ------ | ------ |
| Production | TBD |
| Test | TBD |

### Versions

| Version | URL | Changelog |
| ----- | ------ | ------ |
| v 1.0.0 | TBD | Initial release pending |

## Documentation
#### Become a Client
To have access to TrailHost, you must be a client. [Contact us](mailto:shelby@shelbysolomon.net) for access. Upon account creation, you will receive authentication UID and SECRET keys for token generation. Your token expires every 24 hours and must be renewed. Always store these outside your application.

### Client
* **Create Token**
  Generate token based on Client's UID and SECRET. Tokens expire every 24 hours and must be renewed.

  * Sample call
  ```javascript
    {
      url: "client/token",
      method: "POST",
      headers: [
        uid : [UID],
        secret : [SECRET]
      ]
    }
  ```

  * Sample Response
  ```javascript
    {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoiMjAxNy0wNy0wNVQxNzowNzo1MS4yOTRaIn0.dDIeUGZ52xVDrUXa5itPzTgmPfQxmfbWs-E8iXF0h1A"
    }
  ```
