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
    "chart.js": "^3.9.1",
    "framer-motion": "^7.6.1",
    "next": "12.3.1",
    "react": "18.2.0",
    "react-chartjs-2": "^4.3.1",
    "react-dom": "18.2.0",
    "react-icons": "^4.6.0"
  }

```

> Misc Resources Links

- [UI-react-icons](https://react-icons.github.io/react-icons/icons?name=ai)
- inspired from [ui design](https://dribbble.com/shots/15640240/attachments/7432009?mode=media)
- [chakra-themes/colors](https://chakra-ui.com/docs/styled-system/theme)
- [react-charts](https://react-chartjs-2.js.org/) [examples] (https://react-chartjs-2.js.org/examples/line-chart)
