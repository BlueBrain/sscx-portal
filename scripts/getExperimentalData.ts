import { NexusClient, SelectQueryResponse } from '@bbp/nexus-sdk';
import { sscx } from '../src/config';
import { listEtypes, listEtypesExperiments } from '../src/queries/sparql';

// build a list of e-types and their experiments
export default async (nexus: NexusClient) => {
  try {
    const etypes = (await nexus.View.sparqlQuery(
      sscx.org,
      sscx.project,
      'nxv:defaultSparqlIndex',
      listEtypes(),
    )) as SelectQueryResponse;

    // for each etypes, get experiments
    const all = await Promise.all(
      etypes.results.bindings.map(async etype => {
        const experiments = (await nexus.View.sparqlQuery(
          sscx.org,
          sscx.project,
          'nxv:defaultSparqlIndex',
          listEtypesExperiments(etype.id.value),
        )) as SelectQueryResponse;

        // return a nice little object of experiments per e-types 💗
        return {
          id: etype.id.value,
          label: etype.label.value,
          experiments: experiments.results.bindings.map(exp => ({
            contentUrl: exp.contentUrl.value,
            label: exp.label.value,
          })),
        };
      }),
    );
    return all;
  } catch (error) {
    console.log(error);
    throw new Error('Error generating experimental data');
  }
};
