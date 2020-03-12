/**
 * Lists get specific experiment of specific e-type
 *
 */
export const layerAnatomyDataQuery = (layers: string | string[]) => {
  let filters;
  if (typeof layers === 'string') {
    filters = [{ term: { 'brainLocation.layer.label.raw': layers } }];
  } else {
    filters = layers.map(layer => ({
      term: { 'brainLocation.layer.label.raw': layer },
    }));
  }

  return {
    from: 0,
    size: 10000,
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
              ],
            },
          },
          {
            bool: {
              should: filters,
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
  from: 0,
  size: 10000,
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
