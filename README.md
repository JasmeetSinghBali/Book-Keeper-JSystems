<p align="center">
  💹 <a href="http://BKS.LIVE.LINK"target="_blank"> Book Keeper System</a>
</p>

<p align="center">
  🧩 with <a href="https://www.notion.so/" target="_blank" > Notion </a>
</p>

> ## 🎯 **_Description_**

```

The aim for this project is to make the book keeping simpler i.e track & record incoming & outgoing funds [be it fiat or crypto] related to an individual/business  with additional integration of Notion Workspace via public Authorizations.

```

> 🗃 [Features]

```bash

# @v1


1. User-Flows:

- [✔]  passwordless hassel-free sign in cum sign up flow via Email Magic Link or Oauth Github/Google, best in security , best in user-experience
- [✔] authenticator enabler option for account or other sensitive actions i.e after setting up authenticator crucial account related actions like account deletion, package update wud required additional authenticor code to complete the action
- [✔] adding,editing,deleting contacts, dynamic search on contacts, settings- general & account are functional
- [✔] email-subscription option available
- [✔] in-app bug-report, that sends email directly to the support team/dev team at keeper

2. System-Flows:

- [✔] Automated MFA verification via OTP dispatched to user email on each sign-up or login
- [✔] geolocation & basic-tracking/fingerprint user setup
- [✔] tracing & instrumentation on DB queries|trpc calls

        # all prisma queries are automatically traced
        # to trace a specific trpc mutation/query at server side use global available opentelemetrytracer and wrap that mutation or query inside it
        opentelemetrytracer.startActiveSpan


- [✔] email template and handlebars for fully isolated & customizable enterprise-grade-emails.
- [✔] dual restriction mechanism -  session & trpc user related mutation&queries access system
- [✔] Automated token rotation, after trpc token expires

```

**✨[For more detailed info: check](https://github.com/Jasmeet-1998/Book-Keeper-JSystems/blob/stable/sketch_blueprint_dev/tech_stack_and_dev_logs.md)**

---

---

### <p align="center"> 🚀 **_Running the app_** </p>

```bash

# development

yarn dev

# debug mode


# production mode


```

### <p align="center"> 🧪 **_Test_** </p>

```bash

# unit tests


# e2e tests


# test coverage


```

---

---

#### <p align="center"> 📝 **_Support & License_** </p>

> Book Keeper System is a [MIT licensed](https://choosealicense.com/licenses/mit/) project. It can grow with your support. If you aim to help this project grow / Purpose & Add new features / Report Bugs follow the instructions mentioned here 👉 [How To Contribute](https://github.com/Jasmeet-1998/Book-Keeper-System/blob/stable/contribute.md)
