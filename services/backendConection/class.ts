/* eslint-disable @typescript-eslint/no-explicit-any */
class BackendFetching {
  decryptKey?: string;
  localRequestValidator?: string;
  baseApiUrl?: string;
  backendApiUrl?: string;

  constructor() {
    this.decryptKey = process.env.DECRYPT_KEY;
    this.localRequestValidator = process.env.LOCAL_REQUEST_VALIDATOR;
    this.baseApiUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API
        : process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API;
    this.backendApiUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API + '/graphql'
        : process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API + '/graphql';
  }

  httpCallable(url: string): (configs: RequestInit) => Promise<Response> {
    return async (configs: any) =>
      await fetch(this.backendApiUrl + url, {
        ...configs,
        headers: !configs.noContentType
          ? {
              'Content-Type': 'application/json',
              ...configs?.headers
            }
          : { ...configs?.headers }
      });
  }

  async getRoutes() {
    const query = `
      query {
        routes {
          id
          origin
          destiny
          price
          startTime
          arriveTime
          initialPoint
          finalPoint
          buses {
            model
            plate
            id
          }
        }
      }
    `;

    const response = await this.httpCallable('')({
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        query
      })
    });

    return response;
  }

  async getBusRouteById(id: string) {
    const query = `
      query {
        getRouteById(id: "${id}") {
            id
            origin
            destiny
            price
            startTime
            arriveTime
            initialPoint
            finalPoint
            buses {
                id
                model
                plate
            }
        }
      }
    `;

    const response = await this.httpCallable('')({
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        query
      })
    });

    return response;
  }
}

export default BackendFetching;
