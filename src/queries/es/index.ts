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
      filter: [
        {
          bool: {
            should: [{ term: { '@type': 'https://neuroshapes.org/Trace' } }],
          },
        },
        {
          nested: {
            path: 'derivation.entity',
            query: {
              bool: {
                filter: [
                  { term: { 'derivation.entity.name.raw': experiment } },
                  { term: { 'derivation.entity.@type.raw': 'PatchedCell' } },
                ],
              },
            },
          },
        },
        {
          nested: {
            path: 'annotation.hasBody',
            query: {
              bool: {
                filter: { term: { 'annotation.hasBody.label.raw': etype } },
              },
            },
          },
        },
      ],
    },
  },
});

export const morphologyDataQuery = (layers: string) => ({
  query: {
    bool: {
      filter: [
        {
          bool: {
            should: [
              {
                term: {
                  '@type': 'https://neuroshapes.org/NeuronMorphology',
                },
              },
            ],
          },
        },
        {
          nested: {
            path: 'brainLocation',
            query: {
              bool: {
                filter: [
                  {
                    term: {
                      'brainLocation.label.raw': 'layer 4',
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
});
