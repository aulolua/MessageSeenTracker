# MessageSeenTracker

![GitHub](https://img.shields.io/github/license/aulolua/MessageSeenTracker)

MessageSeenTracker is an open-source program inspired by the project by janmakur. It allows users to check if another user has seen their message. The logic behind this is that it hosts an HTTP server, and the client needs to send a message with the link of that HTTP server. The link is tunneled via Cloudflare using `cloudflared.msi`, which the user is required to install from [github.com/cloudflare/cloudflared releases](https://github.com/cloudflare/cloudflared/releases).


## Installation

To use MessageSeenTracker on Windows, you need to install `cloudflared.msi` from the Cloudflare releases:

- [cloudflared-windows-386.msi](https://github.com/cloudflare/cloudflared/releases/download/2023.7.3/cloudflared-windows-386.msi) - For 32-bit Windows.
- [cloudflared-windows-amd64.msi](https://github.com/cloudflare/cloudflared/releases/download/2023.7.3/cloudflared-windows-amd64.msi) - For 64-bit Windows.

To use MessageSeenTracker on Windows, you need to install `node.js` from the NodeJS releases:

- [nodejs.msi](https://nodejs.org/en/download) - nodejs for all platforms

Download the appropriate MSI file for your system and run it to install `cloudflared`. Once installed, MessageSeenTracker will be able to tunnel messages through Cloudflare.
- [MessageSeenTracker.exe](https://github.com/aulolua/MessageSeenTracker/releases/download/alpha/MessageSeenTracker-win32.exe) - For Windows

## Build Yourself

Before using MessageSeenTracker, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org) - JavaScript runtime to execute the Node.js code.

### Build Instructions

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/aulolua/MessageSeenTracker.git
   cd MessageSeenTracker
   ```

2. Run the HTTP server:

   ```bash
   node server.js
   ```

3. Share the link to the HTTP server with the recipient to send them a message.

## Contributing

We welcome contributions to improve MessageSeenTracker and make it more efficient. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push the branch to your fork: `git push origin feature/your-feature-name`.
5. Submit a pull request with a detailed description of your changes.

## License

MessageSeenTracker is released under the [MIT License](LICENSE).

## Disclaimer

MessageSeenTracker is an open-source project and comes with no warranties or guarantees. The authors are not responsible for any misuse or damages caused by the software. Use it at your own risk.

## Credits

- [janmakur](https://github.com/janmakur) - For the original project idea and inspiration.
- [aulolua](https://github.com/aulolua) - Maintainer of this project.

If you have any questions, feedback, or issues, feel free to open an issue on the GitHub repository. We appreciate your interest and hope you find MessageSeenTracker useful!
