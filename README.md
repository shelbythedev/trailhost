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
To have access to TrailHost, you must be a client. [Contact us](mailto:shelby@shelbysolomon.net) for access. Upon account creation, you will receive authentication UID and SECRET keys. Always store these outside your application.

### Client
`/token`
To access TrailHost, you will need to submit a token in the headers of all requests. This token is generated based on your client UID and SECRET. Tokens expire every 24 hours and must be renewed.

```json
  
```
