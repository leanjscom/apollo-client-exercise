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
