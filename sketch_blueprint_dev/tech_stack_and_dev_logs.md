<p align="center"> <i><u><b> Tech. Stack Breakdown </b></u></i></p>

<br />

<p align="center">
    <img src="./abstractedSystemSketch-2022-10-24-1009.png" width="500px" height="250px" />
</p>

---

1. Book-Keeper UI

- Nextjs
- Next-Auth (OAuth/Single sign in/magic email link)
- chakra UI
- framer motion (for animations)
- zustand (as minimal&simplistic state manager)

2. Backend

- typescript
- trpc [mutations & queries(abstractly based on react-query) procedures]
- prisma "postgreSQL" [supabase](https://supabase.com/docs/guides/integrations/prisma) for cloud hosting the postgres instance with prisma

Misc:

- QR Code Based Authenticator for MFA
- cloudinary (media[images/videos] cloud hosting) https://console.cloudinary.com/users/login

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

- [prismaqueriesclient](// ref: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#examples-61)

  https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

  https://www.prisma.io/docs/concepts/overview/what-is-prisma/data-modeling#:~:text=Using%20Prisma%20Client%20and%20Prisma%20Migrate,-When%20using%20Prisma&text=Manually%20change%20your%20application%20models,Prisma%20Client%20is%20automatically%20generated)

                # after installing prisma depend & defining first basic in schema.prisma
                npx prisma init
                npx prisma generate

                # use until the schema is not definate & after each alteration
                npx prisma db push

                # on finalization after each schema alteration
                npx prisma migrate dev

                # NOTE- if the prisma client schema does not get updated, try reloading VS code close or open / delete node_modules and run npx prisma generate ref: https://stackoverflow.com/questions/65663292/prisma-schema-not-updating-properly-after-adding-new-fields

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

> 3. dev/trpc-flows (reff: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)

- [x] getting user data and session data from db

- [x] setup authorizations trpc , context check using middleware to authorize trpc client request to trpc server ref: https://trpc.io/docs/authorization#option-2-authorize-using-middleware,

- [x] make public procedure call to trpc/server to activate rpc access for user get jwt via seprate route and attach jwt in request body for user info from dashboard and store both rpc token and the user info in the zustand store for other componenets protected routes access.

- [x] setup a rpc access route that is used just to determine wheather rpc access is allowed or not for a page by using stored zustand token if this protected/tracked call fails navigate user to dashboard , this should be in every main page so that repopulate/rotation of the token can be done with auto update in zustand store via dashoard fetch rpc token call

- [x] MFA setup, that will add extra layer of verification of feeding in the generateed authenticator app code when user wants to delete account or update account plan i.e account specific services.

- [x] clean up & remove the irrelevant schema or unused code
      throught project directory.

reff: https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting

- [x] filter/search email/phone text search dynamic contact list page

- [ ] wrap up and make sure each filter, update, add contact by user & change in settings or deleting user account (active: false dont actually delete user account completely) is sorted in reff to frontend end-to-end to backend trpc server call & setup.

- [ ] have a sessionedRoute that checks for the validity of jwt token stored in zustand
      if its not valid the redirect user to dashboard to load up and refresh the token from trpc server into zustand store automatically, have this mutation called in parent pages only and apply the redirection their just exclude dashboard page

- [ ] event-emitters setup for EXTERNAL (email & phone notifications) & INTERNAL (events emitted that handles the logging of IP, access points, device info & geolocation & storing into db from the trpc middleware requestTracker and store against relevant user in DB to show in settings account)

- [ ] report bug in app email sending feature, sending email to my email when anyone write emails to me via handlebars and trpc server send email procedure exposed to users report bug in settings section

- [ ] DB monitoring setup opentelimetry tracing https://www.prisma.io/docs/concepts/components/prisma-client/opentelemetry-tracing

- [ ] DB monitoring setup metrics https://www.prisma.io/docs/concepts/components/prisma-client/metrics

- [ ] [logging & error & performance reports](https://github.com/vercel/next.js/tree/canary/examples/with-sentry)

  [sentrynpm](https://www.npmjs.com/package/@sentry/nextjs)
  [sentrydocs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

- [ ] check responsiveness of each page in brave,edge specially brave.

- [ ] cleanup, wrapup, update readme, feature section, test all flows, remove console statements, add common header in each code file with Author: Jasmeet Singh Bali

- [ ] update all http codes and all related to trpc according to these rpc standards ref: https://trpc.io/docs/rpc

- [ ] tailwind css + landing page premium sleak page

- [ ] deploy this mvp as beta stable version release

---

> ## 🎈 To do 👇 Dev Logs @v2 [branch labels]: DatedFrom: yet to be decided

> 1. Transaction manager/Funds manager

```bash

- [ ] 🎈 tasks yet to be expanded Phase -2 : Transaction Manager flow, incoming/outgoing funds manager, notion integ maybe new feature notion ai etc.....

- [ ] 🧩 user add request to issue new credit/debit keeper card with default/initial payment, the request is processed by admin and the card is funded with initial balance

- [ ] 🧩 user can recharge the card, user can have at max 5 keeper card, user can send funds to other contacts keeper card only, also contact must be registered on the system for the send money to work

```

> 2. pwa/alignment

google chrome developers
ref: https://www.youtube.com/watch?v=sOq92prx00w

```bash

- [ ] Integrate workbox nextjs https://web.dev/learn/pwa/workbox/
- [ ] add caching & routing features
- [ ] setup service workers properly with network & caching
- [ ] add push notification


```

---

> ## 🎈 To do 👇 Dev Logs @v2.4 [branch labels]: DatedFrom: yet to be decided

> 1. subscription integeration

```bash
- [ ] for enabling email subscription, https://trpc.io/docs/subscriptions
```

> 2. websocket setup for streaming text/string data from user notion account related to their finances and update their data automatically when they make updates

```bash
- [ ] https://trpc.io/docs/subscriptions#creating-a-websocket-server
```

---

> ## 🎈 To do 👇 Dev Logs @v2.8 [branch labels]: DatedFrom: yet to be decided

> 1. setup buttons on possible location like login,verify, pages where failure chances are high in developer note so that they can directly send me a email from a modal within the app label it as programatically BUG|Feedback keeper when this is sended to my email.

> 2. add cypress for predefined core/basic automation test journeys https://docs.cypress.io/guides/getting-started/installing-cypress#Advanced-Installation
