# WAsabi-iro(#A8BF93)

This project automates the process of sending weekly garbage collection reminders to residents using the LINE Messaging API. Additionally, it includes a feature to send quotes from residents, sourced via Google Forms and managed through Google Apps Script.

## Features

- Sends weekly garbage collection reminders on designated days.
- Integrates with LINE Messaging API for message delivery.
- Includes residents' quotes sourced from Google Forms.
- Utilizes Google Apps Script to manage data and select random quotes.

## Installation

### Setting Up clasp

```sh
npm install -g @google/clasp
```

### Google Docs Setup

1. Create a Google Form.
2. Connect the Form to Google Sheets:
   1. Google Forms > Link Sheets
3. Obtain the Script ID:
   1. Go to the linked Google Sheet > Extensions > Apps Script > Project Settings > IDs

### Setting Up This Repository

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.clasp.json` file:
   1. Rename `.clasp.json.example`.
   2. Edit `scriptId` accordingly.

## Using clasp Commands

### Login

This command logs in and authorizes management of your Google account's Apps Script projects. Once it is run, you are asked to sign into a Google account where your Apps Script projects are stored.

```sh
clasp login
```

### Upload a script project

This command uploads all of a script project's files from your computer to Google Drive.

```sh
clasp push
```

### Open the project in the Apps Script editor

This command opens a script project in the Apps Script editor. The editor is launched as a new tab in your default web browser.

```sh
clasp open
```

### more information

For more information, visit [Use the command line interface with clasp](https://developers.google.com/apps-script/guides/clasp).

## Environment Variables

Before deploying this application on Google Apps Script (GAS), you'll need to set up the following environment variables. These variables are essential for the proper functioning of the application.

### Required Variables:

- `lineChannelAccessToken`: This is the access token for your LINE Messaging API. It allows your application to send messages to LINE users.
- `lineGroupId`: This is the ID of the LINE group where your application will send messages. Ensure that your bot is in this group.
  - see also: [developers.line.biz](https://developers.line.biz/en/docs/messaging-api/group-chats/#add-bot-group-room)
  - see also: [kfs214/kame-nozoki](https://github.com/kfs214/kame-nozoki)
- `lineApiOrigin`: This is the origin URL for the LINE Messaging API. It specifies the endpoint for sending messages and other API requests to LINE.
  - example: `https://api.line.me`
  - see more: [developers.line.biz](https://developers.line.biz/en/reference/messaging-api/#domain-name)

### Setting Environment Variables in GAS:

To set environment variables in Google Apps Script, follow these steps: [developers.google.com](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)
