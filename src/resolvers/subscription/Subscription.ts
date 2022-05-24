export const Subscription = {
    feedSubscription: {
        subscribe: async (parent: any, args: any, context: any) => context.prisma.$subscribe
            .post({
                mutation_in: ['CREATED', 'UPDATED'],
            })
            .node(),
        resolve: (payload: any) => payload,
    },
};
