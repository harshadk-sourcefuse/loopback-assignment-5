import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'rest',
  connector: 'rest',
  operations: [
    {
      template: {
        "method": "POST",
        "url": "http://localhost:8000/users",
        "body": {
          "firstName": "{firstName}",
          "lastName": "{lastName}",
          "middleName": "{middleName}",
          "email": "{email}",
          "address": "{address}",
          "phoneNumber": "{phoneNumber}",
          "customerId": "{customerId}",
        },
        "responsePath": "$"
      },
      functions: {
        "createUser": ["firstName", "middleName", "lastName", "email",
          "address", "phoneNumber", "customerId"]
      }
    },
    {
      template: {
        "method": "PATCH",
        "url": "http://localhost:8000/users/{id}",
        "body": {
          "id" : "{id}",
          "firstName": "{firstName}",
          "lastName": "{lastName}",
          "middleName": "{middleName}",
          "email": "{email}",
          "address": "{address}",
          "phoneNumber": "{phoneNumber}",
          "customerId": "{customerId}",
        },
        "responsePath": "$"
      },
      functions: {
        "updateUserById": ["id", "firstName", "middleName", "lastName", "email",
          "address", "phoneNumber", "customerId"]
      }
    },
    {
      template: {
        "method": "GET",
        "url": "http://localhost:8000/users/{id}",
        "responsePath": "$"
      },
      functions: {
        "getUserById": ["id"]
      }
    },
    {
      template: {
        "method": "GET",
        "url": "http://localhost:8000/users",
        "responsePath": "$"
      },
      functions: {
        "getUsers": []
      }
    },
    {
      template: {
        "method": "DELETE",
        "url": "http://localhost:8000/users/{id}",
        "responsePath": "$"
      },
      functions: {
        "deleteUserById": ["id"]
      }
    },
    {
      template: {
        "method": "GET",
        "url": "http://localhost:8000/users/count",
        "responsePath": "$"
      },
      functions: {
        "getUsersCount": []
      }
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  dataSource(arg0: string): import("@loopback/repository").Model {
    throw new Error("Method not implemented.");
  }
  [x: string]: any;
  static dataSourceName = 'rest';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.rest', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

}
