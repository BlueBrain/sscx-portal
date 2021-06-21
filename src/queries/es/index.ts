
type ESQuery = Record<string, unknown>;

/**
 * Lists get specific experiment of specific e-type
 *
 */
export const layerAnatomyDataQuery = {
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
                  '@type': 'LayerThickness',
                },
              },
              {
                term: {
                  '@type': 'NeuronDensity',
                },
              },
              {
                term: {
                  '@type': 'SliceCollection',
                }
              }
            ],
          },
        },
      ],
    },
  },
};

export const fullElectroPhysiologyDataQuery = (
  etype: string,
  experiment: string,
): ESQuery | null => {
  if (!etype || !experiment) {
    return null;
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { term: { '@type': 'Trace' } },
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
          {
            bool: {
              must_not: {
                term: { 'note': 'subset' }
              }
            }
          },
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
        ],
      },
    },
  };
};

export const modelEphysByNamesDataQuery = (
  names: string[],
): ESQuery | null => {
  if (!names) {
    return null;
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { term: { '@type': 'Trace' } },
              ],
            },
          },
          {
            bool: {
              must: {
                terms: { 'name.raw': names }
              }
            }
          },
          {
            bool: {
              must: {
                term: { 'note': 'subset' }
              }
            }
          },
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
        ],
      },
    },
  };
};


export const modelSimTraceByNameDataQuery = (
  name: string,
): ESQuery | null => {
  if (!name) {
    return null;
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { term: { '@type': 'SingleCellSimulationTrace' } },
              ],
            },
          },
          {
            bool: {
              must: {
                term: { 'name.raw': name }
              }
            }
          },
        ],
      },
    },
  };
};


export const mtypeExpMorphologyListDataQuery = (
  mtype: string
): ESQuery | null => {
  if (!mtype) {
    return null;
  }

  return {
    from: 0,
    size: 200,
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
                    '@type': 'ReconstructedCell',
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
  };
};

export const morphologyDataQuery = (
  mtype: string,
  instance: string
): ESQuery | null => {
  if(!mtype || !instance) {
    return null;
  }

  return {
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
                    '@type': 'NeuronMorphology',
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
  };
};


export const dataByIdQuery = (
  id: string | string[]
): ESQuery | null => {
  if(!id) {
    return null;
  }

  return {
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
                    '@id': id,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
};


export const etypeTracesDataQuery = (
  etype: string,
): ESQuery | null => {
  if (!etype) {
    return null;
  }

  return {
    from: 0,
    size: 10000,
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { term: { '@type': 'Trace' } },
              ],
            },
          },
          {
            bool: {
              must_not: {
                exists: {
                  "field": "note",
                },
              },
            },
          },
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
  };
};