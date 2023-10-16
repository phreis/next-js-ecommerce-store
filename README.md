# Next.js ecommerce store

This demo project tries to mimic the very basic functionalties of a fictive ECommerce shop. It basically can be seen as a personal proof of concept of the following concepts:

- Typescript
- React
- next.js using App Router
- postgres / Database migrations
- Unit tests
- E2E Test
- Deployment

## My learnings while doing this project:

- Get basic understanding of the next.js concepts e.g. seperation into Server Side Components and Client Side Components. What is should be where and how are Client/Server side related.
- Understanding of the next.js route/dynamic route concepts and its implementation.
- next. js server actions, which I finally felt in love with 😉
- Tried to avoid client components whenever possible, implemented Server Components instead e.g. Form with Form Action instead of useState/input events
- Introducing Type Script
- Database connection: Learn to set up a postgres database the proper way. Learn how and where to keep credentials save and how to retrieve them. How to structure database related functionalities within the project.
- Implement and use Database migration using ley.js
- Elaboration on Unit tests - What makes sense to be tested. Refactor parts of the codebase in order to get testable functions. (at least as an example)
- Implement unit test(s) (Jest framework)
- Implement E2E test using Playwright (`npx playwright test --ui*` and `npx playwright codegen <url>` )
- Learn gitHub actions:

  - Set up `.github/wokflow/<action>.yml` to do jest/playwright tests on github on each push (Involves setting up a and run a Docker-Container)
  - Set up `.github/wokflow/<action>.yml` to trigger deployment (Fly.io)

- Learn how deployment to production is beeing done these days. (Fly.io)

## Installation

1.  ### Clone this repo to you local machine and install dependencies

    ```git clone phreis/next-js-ecommerce-store
    cd next-js-ecommerce-store
    pnpm install
    ```

2.  ### Install postgres and set up the database

    2.1 Install postgres, in case you haven't already.

    ```
    brew install postgresql@15
    brew link postgresql@15
    ```

    Set an environment variable to tell PostgreSQL where to put the data:

    ```
    [[ -d /opt/homebrew/var/postgresql@15 ]] && PGDATA_TMP=/opt/homebrew/var/postgresql@15 || PGDATA_TMP=/usr/local/var/postgresql@15
    echo "\nexport PGDATA=$PGDATA_TMP\nexport LC_ALL=en_US.UTF-8" >> ~/`[[ $SHELL == *"zsh" ]] && echo '.zshrc' || echo '.bash_profile'`
    source ~/`[[ $SHELL == *"zsh" ]] && echo '.zshrc' || echo '.bash_profile'`
    ```

    Verify if PostgreSQL has been correctly installed

    ```
    postgres

    ```

    You should get some output to console containing `database system is ready to accept connections`

    #### 2.2 Setup the database for this project

    - Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information. Choos a databasename, username and passwort. In out testcase it is recommend to use the same string for all variables. E.g. something like this:

      ```
      PGHOST=localhost
      PGUSERNAME=next_js_ecommerce_store
      PGPASSWORD=next_js_ecommerce_store
      PGDATABASE=next_js_ecommerce_store

      ```

    - `psql postgres`
    - Enter in the repl:

      ```
       CREATE DATABASE <database name>;
       CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
       GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
       \connect <database name>;
       CREATE SCHEMA <user name> AUTHORIZATION <user name>;
      ```

      `quit` to leave the prsql repl.

    #### 2.3 Run the migrations

    - Create the database tables and inserts some entries
      The following command processes the files in `./migrations` in a sequential order. Whe need to use the option `-r tsm`, as our migration files are Type Script.

      ```
      ley up -r tsm
      ```

      Hint: To undo/initialize the migrations e.g. delete entries and tables we could use:

      ```
      ley down -a -r tsm
      ```

## Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Fly.io

1. Install flyctl
   flyctl is a command-line utility that lets you work with Fly.io

   ```
   brew install flyctl
   ```

2. Sign up on Fly.io and verify your email
3. On the Fly.io dashboard page, click on the Add a payment method link at the top right of the page and follow the instructions (you will not be charged)
4. On the Fly.io Tokens page, generate a new Fly.io access token named GitHub Actions Deploy Token and copy it from the text box that appears - it will only be shown once
5. In your GitHub repo under Settings → Secrets → Actions, click the New repository secret button at the top right of the page and create a new token with
   the name FLY_API_TOKEN and the token you copied as the secret
6. On the command line, open the Fly.io login page in your browser using the following command:
   `flyctl auth login`
7. Enter your credentials in the browser window that appears and then click on the link Try Fly.io for free.
8. Switch back to the terminal - it should now show a message like successfully logged in as <your email>.
9. Create an app, specifying the name using only lowercase letters and dashes:
   flyctl apps create --name <app name> --machines
10. Create the Fly.io config files as demonstrated in the lecture (also available in the Next.js example repo)
11. Change your ley.config.mjs as in the lecture: add ssl config for Vercel
12. Change your util/config.mjs as in the lecture: exit early in production, alias Vercel database environment variables
13. Change your next.config.js as in the lecture: disable linting and type checking on build, since this happens earlier in the GitHub Actions deploy workflow
14. Add database credentials using Fly.io secrets, randomly generating the database name, username and password:

    ```
    flyctl secrets set PGHOST=localhost PGDATABASE=upleveled$(openssl rand -hex 16) PGUSERNAME=upleveled$(openssl rand -hex 16) PGPASSWORD=$(openssl rand -base64 32)
    ```

    If your app needs any additional environment variables such as API keys, also add them to the secrets using the following pattern:
    flyctl secrets set <secret name>=<secret value>
    The Next.js documentation mentions exposing variables to the browser using variables prefixed with NEXT*PUBLIC*. Instead of using environment variables for this, we recommend declaring a JavaScript variable in your code because this information is not secret - it will be exposed to the browser. If you absolutely need to set a NEXT*PUBLIC* environment variable, you can add it to your .env.production file.

15. Create a 1GB volume for the PostgreSQL database in the Bucharest region (slower region IDs: Amsterdam ams or Warsaw waw):

    ```
    flyctl volumes create postgres --size 1 --region otp
    ```

16. Deploy the first version of the app:

    ```
    flyctl deploy
    ```

You may receive a failed to fetch an image or build from source error during deployment:
Error failed to fetch an image or build from source: error building: executor failed running [/bin/sh -c yarn build]: exit code: 1
Deploys may fail for a number of reasons, to find the real error message you will need to scroll up in the logs and find the first line that looks like an error.
