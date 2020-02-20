export const listEtypes = () => `
prefix nsg: <https://neuroshapes.org/>
prefix schema: <http://schema.org/>

SELECT DISTINCT (?etypeId AS ?id) (?etypeLabel AS ?label)
WHERE {
  ?s rdf:type schema:Dataset ;
     nsg:annotation / nsg:hasBody ?etypeId .
  ?etypeId rdfs:label ?etypeLabel
}
ORDER BY ASC(?etypeLabel)
`;

export const listEtypesExperiments = (etypeId: string) => `
prefix nsg: <https://neuroshapes.org/>
prefix schema: <http://schema.org/>
prefix prov: <http://www.w3.org/ns/prov#>

SELECT DISTINCT (?entity AS ?id) (?entityName AS ?label)
WHERE {
  ?s rdf:type schema:Dataset ;
     nsg:annotation / nsg:hasBody <${etypeId}> ;
     nsg:derivation / prov:entity ?entity .
  ?entity schema:name ?entityName
  }
ORDER BY ASC(?entityName)
`;
