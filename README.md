Apollo client exercise
=========================

This repo contains some exercise to help you learn the following:

- Apollo client grapql HOC
- Pagination using Relay Cursor Connections specification
- GraphQL query and mutation

## Exercise part 1

http://ec2-35-176-58-126.eu-west-2.compute.amazonaws.com:8080/graphiql

* Query a list of courses
* Query a single course by id
* Query a single course by $id  (id is a variable)
* How many courses in the system?
* How many currencies in the system?
* How many types do we have in the system?


## How to install

- `git clone git@github.com:leanjscom/apollo-client-exercise.git`
- `cd apollo-client-exercise`
- `npm install` or `yarn install`
- `npm start`

## Exercise part 2

1. Implement the query in src/voucher/graphql/Vouchers.graphql
2. Import Vouchers.graphql in src/voucher/components/VoucherList.jsx and connect the component to the query
3. Implement the query in src/voucher/graphql/Voucher.graphql
4. Import Voucher.graphql in src/voucher/components/EditVoucher.jsx and connect the component to the query
5. Implement the mutation in src/voucher/graphql/CreateVoucher.graphql
6. Import CreateVoucher.graphql in src/voucher/components/NewVoucher.jsx and connect the component to the query
7. Implement the mutation in src/voucher/graphql/UpdateVoucher.graphql
8. Import UpdateVoucher.graphql in src/voucher/components/EditVoucher.jsx and connect the component to the query

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).

Thinking in GraphQL exercise
=========================

This repo contains some exercises to help you learn the following:

- Thinking in Graphs
- Setting up a GraphQL server using Express
- GraphQL queries
- Pagination using the Relay Cursor Connections specification

## Exercise part 1

http://ec2-35-176-58-126.eu-west-2.compute.amazonaws.com:8080/graphiql

* Query a list of courses
* Query a single course by id
* Query a single course by $id  ($id is a variable)
* How many courses in the system?
* How many currencies in the system?
* How many types do we have in the system?

## Exercise part 2

### Before Install

- Make sure you have `mongodb` available & running
- you can [Install mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew) in your mac through `brew`

### How to install

- `git clone git@github.com:leanjscom/thinking-in-graphql.git`
- `cd thinking-in-graphql`
- create folders needed for your local mongodb database: `mkdir data && mkdir data/db`
- `mongod --dbpath=data/db`
- open in a separate shell the project folder and execute the following commands
- `yarn install` or `npm install`
- `yarn start` or `npm start`

### Questions exercise part 2

1. In src/server.js add graphqlExpress using https://github.com/apollographql/apollo-server#express.
2. The field currency in Course type (src/graphql/types/course) should be of type CurrencyTypeEnum and should be non null.
3. The course field in src/graphql/fields/course should have the id of the course as an argument
4. Include the Voucher queries into src/graphql/fields/index.js
5. Finish the implementation in the vouchers field in src/graphql/fields/voucher.js
6. Fix the resolver in the voucher field in src/graphql/fields/voucher.js
7. The voucher type (src/graphql/types/voucher.js) should have a field called course that should return the course of that voucher. You should be able to do this https://goo.gl/ffGsDo
8. The course type (src/graphql/types/course.js) should have a field called vouchers that should resolve to a relay connection with all the vouchers of that course. You should be able to do this https://goo.gl/PfRF4K

## Further reading

- http://graphql.org/learn/
- http://graphql.org/learn/thinking-in-graphs/
- https://dev-blog.apollodata.com/graphql-vs-rest-5d425123e34b
- https://dev-blog.apollodata.com/graphql-explained-5844742f195e
- https://facebook.github.io/relay/docs/thinking-in-graphql.html
- https://dev-blog.apollodata.com/the-anatomy-of-a-graphql-query-6dffa9e9e747
- https://github.com/apollographql/apollo-server
- https://www.youtube.com/watch?v=PHabPhgRUuU
- https://facebook.github.io/relay/graphql/connections.htm
- https://dev-blog.apollodata.com/introducing-launchpad-the-graphql-server-demo-platform-cc4e7481fcba
- https://dev-blog.apollodata.com/
- http://dev.apollodata.com

