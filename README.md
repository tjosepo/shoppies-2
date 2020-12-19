# Shoppies v2

[Shoppies v2](https://shoppies-v2.web.app/) is second attempt at [Shopify Challenge for Web Developer interns](https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit). See [my first attempt](https://github.com/tommy-josepovic/shoppies-old).

For this attempt, I decided to focus on improving the UX. 

If you can think of any way I can improve this project, I would sincerely appreciate if you could make me aware of it by leaving an issue.

## Features

- Mobile First Design
- Shareable links
- Persistent local storage
- Info-panels for movies
- Great UI

## Stack

- React
- TypeScript
- Apollo
- SCSS
- Material-UI

## Building locally

Clone the repo, and:

```
npm install
npm run build
```

You can run the development server with:

```
npm start
```

Make sure to have a valid [OMDB key](https://www.omdbapi.com/apikey.aspx):

```
# .env
REACT_APP_OMBD_KEY=...
```
