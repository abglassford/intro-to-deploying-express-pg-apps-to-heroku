## Objectives

* Understand what Heroku is and how it works
* Be able to use Heroku logs to debug
* Understand what an environment variable is
* Be able to use the `dotenv` npm package
* Be able to deploy an Node/Express app to Heroku using the CLI
* Be able to connect your app to a postgres database on heroku

## EXERCISE SUMMARY

Included in this repo is a CRUD app that uses a local Postgres database. Your mission will be to deploy the included repo to Heroku and connect it to a Heroku provided Postgres database.

## What is Heroku?

Google `how does heroku work` and click on the `https://devcenter.heroku.com` link. Read the documentation through __RELEASES__ and stop. Then, use the documentation to answer the following questions:

1. What dependency file does Heroku use to deploy your Node.js app?
1. How does Git relate to Heroku?
1. How does Heroku associate your repo to its platform?
1. What is a slug?
1. What is a dyno?
1. What is a config variable?
1. What is a release?

Draw a diagram that illustrates how Heroku works and incorporate the above components. Then, add a `your-name.md` file to this repo and add your answers to each of the above questions.

## Getting Started with Heroku

If you don't already have a heroku account, follow these steps.

1. Sign up for [Heroku](https://signup.heroku.com/)
1. Download the Heroku [Toolbelt](https://toolbelt.heroku.com/)
1. Login - `heroku login`

## Deploying to Heroku From the Command Line

```sh
$ heroku create
```

This command sets up your app, with a random name, on Heroku as well as a Git remote called `heroku`. Alertantively, you can pass in a name as a command line argument to create your own name:

```sh
$ heroku create restaurants-martha
```

**PROTIP** - You can also rename your app by running the command:

```sh
$ heroku apps:rename <name-you-want-to-use-instead>
```

## .gitignore

Make sure you have a .gitignore file:

```
/node_modules
/*.env
```

Now you can deploy using Git:

```sh
$ git add -A
$ git commit -m "prep for deployment"
$ git push heroku master
```

Open your Heroku deployed app using:

```
heroku open
```

Click through the app to confirm that everything is working as it should. Is it broken? If so, how can we gain insight about why the app is broken?

## Debugging Heroku

For starters, _always_ confirm that your app is working locally as it should. Then, if all is well locally, continue to debug heroku.

Come up with a theory about why your app might be broken. As quickly as you can, gather evidence to prove or disprove this theory. Repeat this process until your app is fixed.

Since your local server logs and the console won't be any help for debugging Heroku, where can you go to get more information?

The below command will print out a log of your application's launch process. Sift through it and look for clues about what's going wrong. When you spot a line that looks helpful, grab it a throw it into Google to help you decipher the error.

```
heroku logs
```

## Connecting to a Heroku Hosted Postgres Database

First, run the below command to see if you have any configured environment variables. It should be empty, but let's confirm

```
heroku config
```
Ok, now run the below command to tell Heroku you want to connect a database to this app.

```
heroku addons:create heroku-postgresql
```

Check your config variables again. What do you see?

```
heroku config
```

You should see an environment variable called `DATABASE_URL` with a value that is a very long url to a postgres database.

`add`, `commit`, `git push heroku master` and check your app again.

## Using the `dotenv` package to config environment variables

You'll need some help getting your app to talk to your environment variables, both locally as well as deployed.

Google `npm dotenv` and read the docs to help you get up and running with a `.env` file in your Node.js app.

1. add a `.env` file to your app
1. in your `.env` file add the following line:
  ```
  DATABASE_URL=postgres://localhost/library
  ```
1. find the line in `routes/books.js` that refers to `postgres://localhost/library` and change it to:
  ```
  process.env.DATABASE_URL || 'postgres://localhost/library'
  ```

`add`, `commit`, `git push heroku master` and check your app again. OR if you think it is still broken, what other steps might still need to be taken for your app to work on Heroku?

## Getting into your Heroku database

```
heroku pg:psql
```

This opens a `psql` session that's connected to your database on Heroku. You can execute raw `sql` here just as you do for your local database.

To run sql files, you can execute:

```
heroku pg:psql < myfile.sql
```

Continue the debugging process until you're app is up and running as it should.

## Next Steps

Once you've got this app up and running on Heroku, deploy another CRUD app of your choosing and add the url to your README.  
