/**
 * Lists get specific experiment of specific e-type
 *
 */
export const electroPhysiologyDataQuery = (
  etype: string,
  experiment: string,
) => ({
  query: {
    bool: {
      must: [
        {
          nested: {
            path: 'annotation.hasBody',
            query: {
              bool: {
                must: {
                  match: {
                    'annotation.hasBody.label': etype,
                  },
                },
              },
            },
          },
        },
        {
          nested: {
            path: 'derivation',
            query: {
              nested: {
                path: 'derivation.entity',
                query: {
                  bool: {
                    must: {
                      match: {
                        'derivation.entity.name': experiment,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
});
