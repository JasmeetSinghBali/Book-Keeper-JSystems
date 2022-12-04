<p align="center"> <i><u><b> Tech. Stack Breakdown </b></u></i></p>

<br />

<p align="center">
    <img src="./abstractedSystemSketch-2022-10-24-1009.png" width="500px" height="250px" />
</p>

---

1. Book-Keeper UI

- Nextjs
- chakra UI

2. Backend [t3 stack]

- typescript
- trpc
- prisma "postgreSQL" [supabase](https://supabase.com/docs/guides/integrations/prisma) for cloud hosting the postgres instance with prisma

Misc:

- QR Code Based Authenticator

---

> ## Frontend (UI)

```bash

#new project
yarn create next-app --typescript

```

> Dependencies

```bash

"dependencies": {
    "@chakra-ui/react": "^2.3.6",
    "@emotion/react": "^11.10.4",
    "@emotion/styled": "^11.10.4",
    "@hookform/resolvers": "^2.9.10",
    "@next-auth/prisma-adapter": "^1.0.5",
    "@prisma/client": "^4.7.0",
    "@tanstack/react-query": "^4.14.3",
    "@trpc/client": "^10.0.0-proxy-beta.26",
    "@trpc/next": "^10.0.0-proxy-beta.26",
    "@trpc/react": "^9.27.4",
    "@trpc/react-query": "^10.0.0-proxy-beta.26",
    "@trpc/server": "^10.0.0-proxy-beta.26",
    "bcryptjs": "^2.4.3",
    "chart.js": "^3.9.1",
    "framer-motion": "^7.6.2",
    "handlebars": "^4.7.7",
    "jsonwebtoken": "^8.5.1",
    "next": "12.3.1",
    "next-auth": "^4.17.0",
    "nodemailer": "^6.8.0",
    "react": "18.2.0",
    "react-chartjs-2": "^4.3.1",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.39.2",
    "react-icons": "^4.6.0",
    "react-query": "^3.39.2",
    "zod": "^3.19.1",
    "zustand": "^4.1.4"
  }

```

> ## Misc Resources Links

> Frontend

- [UI-react-icons](https://react-icons.github.io/react-icons/icons?name=ai)

- user dashboard inspired from [ui design](https://dribbble.com/shots/15640240/attachments/7432009?mode=media)

- user settings inspired from [ui design](https://dribbble.com/shots/17219601-Integrations-settings-page-Untitled-UI?utm_source=Clipboard_Shot&utm_campaign=jordanhughes&utm_content=Integrations%20settings%20page%20%E2%80%94%20Untitled%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=jordanhughes&utm_content=Integrations%20settings%20page%20%E2%80%94%20Untitled%20UI&utm_medium=Social_Share)
- billing section inspired from [ui design](https://dribbble.com/shots/18060542-Billing)

- [chakra-themes/colors](https://chakra-ui.com/docs/styled-system/theme)

- [react-charts](https://react-chartjs-2.js.org/) [examples] (https://react-chartjs-2.js.org/examples/line-chart)

- for AnimatePresence when [filter props](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

- [framer-book](https://framerbook.com/animation/example-animations/35-swipe-to-delete/)

- account sub-section settings

        Current Plan, Last Accessed IP & Date  Logs  ||
        update plan, Report Bug, delete account ||

- My Contacts Page [ui design](https://dribbble.com/shots/15221832-Nara-Medics-Contact-Management-Page)

---

> Backend

- [Supabase](https://app.supabase.com/) cloud hosting postgresql db instance specifically

- [prisma](https://www.prisma.io/docs/concepts/components/prisma-schema)

  https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

  https://www.prisma.io/docs/concepts/overview/what-is-prisma/data-modeling#:~:text=Using%20Prisma%20Client%20and%20Prisma%20Migrate,-When%20using%20Prisma&text=Manually%20change%20your%20application%20models,Prisma%20Client%20is%20automatically%20generated)

                # after installing prisma depend & defining first basic in schema.prisma
                npx prisma init
                npx prisma generate

                # use until the schema is not definate & after each alteration
                npx prisma db push

                # on finalization
                npx prisma migrate dev

                # to run prisma studio locally
                npx prisma studio

- zod https://blog.logrocket.com/schema-validation-typescript-zod/#composing-complex-schema-objects

- trpc

            # ------procedures--------
            each procedures corresponds to an endpoint like in rest API

            # each procedure can be
            - query
               or
            - mutation

            # each procedure can have input with validation and any package third party of # home brew could be used to validate inputs

            # renaming symbols at client that make cascaded updates throughout the server as well
            select a word and press F2 and type the new name and enter

            # @@@ example @@@
            before
            trpc.hello
            after
            trpc.greetings

---

> ## 🎈 To do 👇 Dev Logs @v1 [branch labels]: DatedFrom: 15-11-2022

1.  setup/nextAuth & OauthSignIn with session data barebones managment

```bash

=============== Task List ================

- [x] setup & wire up login page. https://next-auth.js.org/providers/google go to -> https://console.developers.google.com/apis/credentials -> create new project -> create credentials selecting the newly created project -> Oauth Client ID & select web application
add redirect uri http://localhost:3000/api/auth/callback/google & use client ID & secret to configure provider in nextjs provider section

- [x] email server setup for magic email login, and dispatching
emails to users https://my.sendinblue.com/dashboard or https://www.siteground.com/kb/gmail-smtp-server/

- [x] sort prisma+supabase+nextjs integration, maintain session data inside postgresql hosted DB ref: https://next-auth.js.org/adapters/supabase

        API URL and Keys
        Go to the Settings page in the Dashboard.
        Click API in the sidebar.
        Find your API URL , anon , and service_role keys on this page.

- [x] templating dispatched emails, https://www.npmjs.com/package/handlebars, https://www.litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design

        # IMPORTANT, for html content over email use port 465 to serve html over TLS in smtp , port 587 wont work
        https://forum.gitlab.com/t/smtp-fail-to-send-email-due-to-ssl-wrong-version-number/33008/2

- [x] welcome email for new user signup when they login directly via sign in email magic link 'createUser event' next-auth events https://next-auth.js.org/configuration/events



============ Resources =============

- [init nextjs](https://next-auth.js.org/configuration/initialization#advanced-initialization)

https://next-auth.js.org/configuration/options

- Nextjs Auth https://next-auth.js.org/configuration/providers/oauth

- [magic email link sign in](https://next-auth.js.org/configuration/providers/email)

```

---

> 2. tweaks/signup-and-schema

```bash

- [x] sort/patch/update schema for contact, cards, user

- [x] barebones & research session & state managment setup via zustand 🎈 though look out for this-> https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#conditionally-suspending-on-data , maybe state managment will become obsolete altogether when this feature rolls out & nextjs already makes the state managment obsolete with this approach with ssr & server side data fetches.

- [x] add session restriction for each page & component, only logged in user allowed to visit dashboard and other pages

- [x] redirect user to settings page if they  phone number is set null in DB yet as this means that the user directly signed in cum sign up via mail magic link or Oauth sign in and it created user in our DB.

- [x] provide each settings section with user data from db

```

> 3. dev/trpc-flows

- [x] getting user data and session data from db

- [x] setup authorizations trpc , context check using middleware to authorize trpc client request to trpc server ref: https://trpc.io/docs/authorization#option-2-authorize-using-middleware ,

- [ ] add jwt token signing & verification flow to send jwt from trpc client instance to the trpc server instance ref: https://trpc.io/docs/header

- [ ] wire up trpc flows and schema along with prisma calls to update user email,phone that they can change in their settings, note- only allow user to change email who have verified their email check the sign in via magic email flow wheather that makes emailVerified

- [ ] wrap up and make sure each filter, update, add card, contact by user & change in settings or deleting user account (active: false dont actually delete user account completely) is sorted in reff to frontend end-to-end.

- [ ] event-emitters setup for events emitted that handles the logging of IP, access points, device info & geolocation & storing into db in the trpc middleware requestTracker and store against relevant user in DB to show in settings account

- [ ] [logging & error & performance reports](https://github.com/vercel/next.js/tree/canary/examples/with-sentry)

  [sentrynpm](https://www.npmjs.com/package/@sentry/nextjs)
  [sentrydocs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

- [ ] check responsiveness of each page in brave,edge specially brave.

- [ ] cleanup, wrapup, update readme, feature section, test all flows, remove console statements, add common header in each code file with Author: Jasmeet Singh Bali

- [ ] deploy this mvp as beta version release

- [ ] 🎈 tasks yet to be expanded Phase -2 : Transaction Manager flow, incoming/outgoing funds manager, notion integ maybe new feature notion ai etc.....

---

> ## 🎈 To do 👇 Dev Logs @v2 [branch labels]: DatedFrom: yet to be decided

> 1. pwa/alignment

google chrome developers
ref: https://www.youtube.com/watch?v=sOq92prx00w

```bash

- [ ] Integrate workbox nextjs https://web.dev/learn/pwa/workbox/
- [ ] add caching & routing features
- [ ] setup service workers properly with network & caching
- [ ] add push notification


```

---
