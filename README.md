# Tribal Heart

Tribal Heart is serverless, Meet-Up-like PWA written with AWS Lambda, React, and Recharts on the frontend. The application makes contact with the Google Calendar API to fetch upcoming events. Users can filter events by location, specify number of events displayed per page, use the app when offline, and add an app shortcut to their home screen. A chart is also displayed visualising the different categories of events at the location(s) of concern. Note that when offline, the app will display cached event data. Filtering events for a new location would require internet connection.

This project includes test suites written with React Testing library, Jest (unit & integration tests), Cucumber (acceptance tests), and Puppeteer (end-to-end testing).

## OAuth flow of project

<p align="center">
  <img src="img/arch_diagram.png" width="800">
</p>

## Dev

The file api.js is is designed to detect when the application is running locally. It will then serve mock data from mock-data.js for dev / testing purposes.

Run the development server:

```bash
npm run start
```

Run test suites: (Note - For the end-to-end test suite to run successfully, ensure a local version of the app is running on port 3000)

```bash
npm run test
```

Deploy to the gh-pages branch:

```bash
npm run deploy
```

---

中甴曱甲串申由田㗊𣊫㽬