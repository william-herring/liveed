# Liveed 
![Stars](https://img.shields.io/github/stars/william-herring/liveed)
![Issues](https://img.shields.io/github/issues/william-herring/liveed)

Liveed is a platform for sharing live update feeds. This site is built with:
- Next.js
- TypeScript
- TailwindCSS
- PostgreSQL
- Prisma
- NextAuth

# Table of Contents
1. [Concept](#Concept)
    - [Idea](#Idea)
    - [Examples](#Examples)
2. [Technologies](#Technologies)
    - [Next.js](#Next.js)
    - [TypeScript](#TypeScript)
    - [TailwindCSS](#TailwindCSS)
    - [PostgreSQL](#PostgreSQL)
    - [Prisma](#Prisma)
    - [NextAuth](#NextAuth)
3. [Contribution](#Contribution)
    - [How can I help?](#how-can-i-help)
    - [Setup](#Setup)

# Concept
## Idea
Live blog and update feeds are found everywhere, and are gaining popularity. Unfortunately, most of these are run by big news sites and developers, who do not offer many mainstream solutions. Liveed aims to address this problem by providing a community-based platform for people to share and follow live update feeds with ease. The idea behind Liveed is to make live update feeds publicly accessible, and to create a single location for access to them.

Users may ‘subscribe’ to a feed, and receive notifications of posts marked as key events.

## Examples
To give an idea of what this whole project is actually about, consider the live news feeds below:

- [ABC News](https://www.abc.net.au/news/2022-04-13/federal-election-live-blog-scott-morrison-anthony-albanese/100987060)
- [The Guardian](https://www.theguardian.com/world/live/2022/apr/12/russia-ukraine-war-latest-mariupol-mayor-says-more-than-10000-civilians-killed-zelenskiy-taking-chemical-weapons-threat-seriously)

# Technologies
## Next.js
Next.js is the framework of choice for this project because of its React-based UI system as well as its excellent extendibility. It was chosen for its file-based routing system and server-side/static rendering capabilities. As well as this, it has great support for TypeScript and comes with useful types and hooks out of the box.

## TypeScript
TypeScript allows for type-safe code and representation of data types when using libraries such as Prisma. In some frameworks, TypeScript is not particulary viable due to a lack of support, but Next.js, Prisma and NextAuth all have amaing TypeScript support, making it a perfect fit for this project.

## TailwindCSS
TailwindCSS mainly serves to save the amount of time writing CSS classes. Of course, alternatives like Sass make writing CSS easier, but not faster. TailwindCSS is incredibly easy to use and compiles to a small bundle size in production.

## PostgreSQL
PostgreSQL was chosen as the database because it is a relational SQL database that is easy to set up and can hold any volume of data. There isn't really a reason I chose it over any other database, it's just what I'm used to and something that others can load up from a Docker container or start up a new database if they already have Postgres installed to their system

## Prisma
Prisma is a very popular ORM for use with JavaScript and especially TypeScript. The schema is simple to understand, and represents concepts like one-to-one relationships in a straightforward manner. Making queries is easy and other libraries like NextAuth allow the schema to be extended to store user sessions, etc.

# Contribution
## How can I help?
Contribution is always welcome. A good place to start is looking at the [issues tab](https://github.com/william-herring/liveed/issues) on the GitHub repo. The tags help to indicate what kind of issue it is, whether it is a new feature or a bug. Since this project is in development currently and not yet at the stage of an MVP, most issues will just be the next step to building the site. Make sure you let everyone know that you are working on it and check to make sure nobody else is already working on it by checking the 'assigned' section of the issue. When complete, create a pull request outlining what has changed and what issue was addressed.

## Setup
Begin by cloning the repository.
```
git clone https://github.com/william-herring/liveed.git
```
Next, install dependencies.
```
npm install
```

Now we can set up and connect to a database. For development, it is reccomended that you use a database located on your system, and not hosted in the cloud. You can begin by either [installing PostgreSQL](https://www.postgresql.org/download/) and running ```createdb liveed-db``` or [using Docker](https://www.youtube.com/watch?v=RdPYA-wDhTA) to create a containerised database.

Once your database is up and running, open the .env file and change the example connection string to your database's connection url. Your file should look something like:

```
DATABASE_URL="postgresql://user@localhost:5432/liveed-db"
```

Now there remains just one more step; creating a Google OAuth application for using the authentication.
Create an OAuth 2.0 Client ID at the [Google Cloud API Console](https://console.cloud.google.com/apis/credentials). If prompted to create an OAuth consent screen, follow the steps to complete that first. Fill in the client ID fields as follows:
- Name: Liveed (dev)
- Authorized redirect URI 1: http://localhost:3000/api/auth/callback/google

When this process is complete, take note of the client ID and secret, and then add it to the .env file:

```
.env

//OAuth
GOOGLE_ID="-------------.apps.googleusercontent.com"
GOOGLE_SECRET="---------------------------------"
```

Now, run ```npx prisma db push```, followed by ```npm run dev``` and everything should be running. 
