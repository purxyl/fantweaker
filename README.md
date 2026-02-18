<p align="center">
  <img src="icon.png" alt="FanTweaker Logo">
</p>
<h1 align="center">FanTweaker v0.0.1</h1>
<p align="center">
  Tweak you experience of wikis on Fandom.com with fully customizable view areas, such as deleting the header, sidebar, or even the page rail. Making you the priority again.
</p>
<p align="center">
  <a href="#installation">Get FanTweaker ✨</a>
  •
  <a href="https://purxyl.github.io/fantweaker">Website 🏷️</a>
  •
  <a href="#contributing">Contribute 🤝</a>
</p>



## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Roadmap](#roadmap)
- [Screenshots](#screenshots)
- [Report a bug](#report-a-bug)
- [Contributing](#contributing)
  - [Development](#prerequisites)
- [Attributions](#attributions)
- [License](#license)

## Installation

> [!NOTE]
> FanTweaker is only available for [Firefox](https://www.mozilla.org/en-US/firefox/) at the moment. I'm sorry for the inconvenience.

<a href="https://addons.mozilla.org/en-US/firefox/addon/fantweaker/"><img src="https://cdn.brandfetch.io/idJNWZniow/w/196/h/196/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1767621353823" alt="Firefox Logo" width="16"> Firefox Add-on</a><br>
<a href="https://addons.mozilla.org/en-US/firefox/addon/fantweaker/"><img src="https://cdn.brandfetch.io/idHB2sRZ53/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1704290516125" alt="Chrome Logo" width="16"> Chrome Add-on</a>

## Roadmap

- [ ] Add support for Chrome and other browsers
- [ ] Add more view areas to customize
- [ ] Add typeface customization option for readability improvements
- [ ] Add a reader mode that removes any unnecesary elements for non-contributors. (edit and search buttons, comments, etc.)

## Screenshots

## Report a bug

If you've got any issues with the add-on, please report them directly by [opening an issue][~open-issue].

For any questions, comments, or suggestions, feel free to reach out to me on [Bluesky at @Purxyl](https://bsky.app/profile/purxyl.bsky.social).

## Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes. All contributions are welcome!

### Development

To set up the development environment, follow these steps:

1. Clone the repository and navigate inside it:
```bash
git clone https://github.com/purxyl/fantweaker.git
cd fantweaker
```
2. Install the dependencies:
```bash
npm install
```
3. Do your changes and then start the compiler for Typescript.
```bash
npm run build
```
4. Load the add-on in Firefox:
    - Open Firefox and navigate to `about:debugging`.
    - Click on "This Firefox" in the sidebar.
    - Click on "Load Temporary Add-on" and select the `manifest.json` file from the project directory.


## Attributions

Body text set in [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson.<br>
Icon is a modified version of the [Fandom.com logo](https://www.fandom.com/) by Fandom, Inc.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.










[~open-issue]: https://github.com/purxyl/fantweaker/issues/new
