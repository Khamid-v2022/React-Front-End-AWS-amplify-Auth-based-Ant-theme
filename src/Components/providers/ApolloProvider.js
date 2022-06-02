import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider as ApolloClientProvider } from "react-apollo";
import React, { useContext, useMemo } from "react";
import { useGetUserRole } from "./../../hooks/useGetUserRole";
import { UserAuthenticationContext } from "./UserAuthenticationProvider";

export const ApolloProviderContext = React.createContext({
    userRole: null,
    client: null,
});

const ApolloProvider = ({ children }) => {
    const { session } = useContext(UserAuthenticationContext);
    const userRole = useGetUserRole({ session });
    const jwtToken = session ? session.idToken.jwtToken : undefined;

    const client = useMemo(() => {
        const httpLink = new HttpLink({
            uri: `${process.env.REACT_APP_BASE_URI}/v1/graphql`,
            headers: {
                Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined,
                "x-hasura-role": userRole,
            },
        });
        // const wsLink = new WebSocketLink({
        //     uri: `${process.env.REACT_APP_WEBSOCKET_URI}/v1/graphql`,
        //     headers: {
        //         Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined,
        //     },
        //     options: {
        //         reconnect: true,
        //     },
        // });
        // const link = split(
        //     // split based on operation type
        //     ({ query }) => {
        //         const { kind, operation } = getMainDefinition(query);
        //         return kind === 'OperationDefinition' && operation === 'subscription';
        //     },
        //     wsLink,
        //     httpLink
        // );

        return new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });
    }, [userRole, jwtToken]);

    return (
        <ApolloClientProvider client={client}>
            <ApolloProviderContext.Provider value={{ userRole, client }}>{children}</ApolloProviderContext.Provider>
        </ApolloClientProvider>
    );
};

export default ApolloProvider;
