/**
 * Lists get specific experiment of specific e-type
 *
 */
export const layerAnatomyDataQuery = () => {
  return {
    from: 0,
    size: 1000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              should: [
                {
                  term: {
                    '@type': 'https://neuroshapes.org/LayerThickness',
                  },
                },
                {
                  term: {
                    '@type': 'https://neuroshapes.org/NeuronDensity',
                  },
                },
                {
                  term: {
                    '@type': 'https://neuroshapes.org/SliceCollection',
                  }
                }
              ],
            },
          },
        ],
      },
    },
  };
};

export const electroPhysiologyDataQuery = (
  etype: string,
  experiment: string,
) => ({
  from: 0,
  size: 10000,
  query: {
    bool: {
      filter: [
        {
          bool: {
            must: [
              { term: { '@type': 'https://neuroshapes.org/Trace' } },
            ],
          },
        },
        {
          bool: {
            must: {
              term: { 'name.raw': experiment }
            }
          }
        },
        // {
        //   nested: {
        //     path: 'derivation.entity',
        //     query: {
        //       bool: {
        //         filter: [
        //           { term: { 'derivation.entity.name.raw': experiment } },
        //           { term: { 'derivation.entity.@type.raw': 'PatchedCell' } },
        //         ],
        //       },
        //     },
        //   },
        // },
        {
          nested: {
            path: 'distribution',
            query: {
              bool: {
                must: {
                  match: { 'distribution.encodingFormat': 'application/nwb' },
                },
              },
            },
          },
        },
        // {
        //   nested: {
        //     path: 'annotation.hasBody',
        //     query: {
        //       bool: {
        //         filter: { term: { 'annotation.hasBody.label.raw': etype } },
        //       },
        //     },
        //   },
        // },
      ],
    },
  },
});

export const morphologyDataQuery = (
  mtype: string,
  instance: string
) => ({
  from: 0,
  size: 100,
  query: {
    bool: {
      filter: [
        {
          bool: {
            should: [
              {
                term: {
                  '_deprecated': false,
                },
              },
            ],
          },
        },
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
          bool: {
            should: [
              {
                term: {
                  'name.raw': instance,
                },
              },
            ],
          },
        },
        {
          nested: {
            path: 'annotation.hasBody',
            query: {
              bool: {
                filter: [
                  {
                    term: {
                      'annotation.hasBody.label.raw': mtype,
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
