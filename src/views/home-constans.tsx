import React, { ReactNode } from "react";
import { IconType } from "../components/ExploreSectionCard";

interface Cards {
    title: ReactNode,
    description: string[];
    image: string;
    backgroundColor: 'green' | 'blue' | 'light-blue' | 'yellow' | 'grey',
    links: Array<{label: string, href: string, icon: IconType}>
}
export const cardsData: Cards[] = [
    {
        title: (<>Experimental <br/> data</>),
        description: [
            `The first step in the reconstruction of the SSCx involves the acquisition and organization of data from anatomical 
            and electrophysiological cortical slices from rodent brains.`,
            `Sparse data has been collected both from our own laboratory and from published sources worldwide,
            which describes the structural and functional organization of the SSCx at various anatomical levels.
            This ranges from individual neurons to synaptic connections and network activity in microcircuits.
            The data provides constraints, rules, and the principles to build computational models
            at specific levels of detail.`],
        image: 'experimental-data',
        backgroundColor: "yellow",
        links: [
            { label: 'Layer Anatomy', href: '/experimental-data/layer-anatomy/', icon: 'layer' },
            { label: 'Neuron Morphology', href: '/experimental-data/neuron-morphology', icon: 'neuron' },
            { label: 'Neuron Electrophysiology', href: '/experimental-data/neuron-electrophysiology', icon: 'neuron' },
        ]
    },
    {
        title: (<>Reconstruction <br/> data</>),
        description: [
            `Step two in the SSCx workflow is the extraction of as much information as possible
            from the previously collected sparse data and the exploitation of interdependencies
            to build detailed and dense models of individual cells and cell-circuits.
            From sparse experimental data sets, rules and principles of organization are identified
            and missing information is extrapolated to fill knowledge gaps,
            which enable a dense data-driven digital reconstruction of the entire SSCx region.`
        ],
        image: 'reconstruction-data',
        backgroundColor: "light-blue",
        links: [
            { label: 'Brain Regions', href: '', icon: 'layer' },
            { label: 'Microcircuit', href: '', icon: 'microcircuit' },
            { label: 'Synaptic Pathways', href: '', icon: 'pathway' },
            { label: 'Neurons', href: '/reconstruction-data/neurons/', icon: 'neuron' },
        ]
    },
    {
        title: (<>Digital <br/> reconstructions</>),
        description: [
            `In the third step of our reconstruction workflow, digital reconstructions are built and based on
            experimental datasets taken from specimens at a specific stage of development.
            They are therefore, digital snapshots of the structure and physiology of the brain
            at a specific age range. These digital reconstructions integrate data and knowledge of molecular,
            cellular and circuit anatomy, as well as their physiology.`,
            `Starting from individually reconstructed cell morphologies and
            corresponding electrophysiological behaviors, they can be assembled into
            specific brain region circuits along with their individual synaptic and connectivity models.
            Circuit reconstructions are based on a standardized workflow enabled by
            Blue Brain Project software tools and supercomputing infrastructure.
            The parameterization of the tissue model is strictly based on biological data:
            directly, where available, generalized from data obtained in other similar systems;
            or, where unavailable, predicted from multi-constraints imposed by sparse data.`
        ],
        image: 'digital-reconstructions',
        backgroundColor: "blue",
        links: [
            { label: 'Brain Regions', href: '/digital-reconstructions/brain-regions/', icon: 'layer' },
            { label: 'Microcircuit', href: '/digital-reconstructions/microcircuit/', icon: 'microcircuit' },
            { label: 'Synaptic Pathways', href: '/digital-reconstructions/synaptic-pathways/', icon: 'pathway' },
            { label: 'Neurons', href: '/digital-reconstructions/neurons', icon: 'neuron' },
        ]
    },
    {
        title: `Validations`,
        description: [
            `Validations are a crucial part of the data-driven modeling workflows that reduce the risk
            that errors may lead to major inaccuracies in the reconstruction or
            in simulations of emergent behavior. Successful validations not only enable
            the systematic exploration of the emergent properties of the model,
            but also establish predictions for future in vitro experiments,
            or may call into question existing experimental data. Failure in validation may also indicate
            errors in experimental data, permitting the identification of future refinements.
            Rigorous validation of a metric at one level of detail therefore also prevents error amplification
            to the next level, and triggers specific experimental refinements.`,
            `The Blue Brain Project Validation step provides a scaffold that enables the integration of
            available experimental data, identifies missing experimental data,
            and facilitates the iterative refinement of constituent models.`
        ],
        image: 'validations',
        backgroundColor: "green",
        links: [
            { label: 'Brain Regions', href: '', icon: 'layer' },
            { label: 'Microcircuit', href: '', icon: 'microcircuit' },
            { label: 'Synaptic Pathways', href: '', icon: 'pathway' },
            { label: 'Neurons', href: '', icon: 'neuron' },
        ]
    },
    {
        title: `Predictions`,
        description: [
            `The digital reconstruction of the SSCx provides an array of predictions
            across its many levels of organization. These predictions provide insights
            to link underlying structure with function. In addition, predictions are also a means
            to validate the component models of the SSCx model and identify missing data
            that could guide targeted experiments.
            In particular, we provide predictions on the propagation of activity
            across the different sub-regions of the SSCx.`
        ],
        image: 'predictions',
        backgroundColor: "grey",
        links: [
            { label: 'Brain Regions', href: '', icon: 'layer' },
            { label: 'Microcircuit', href: '', icon: 'microcircuit' },
            { label: 'Synaptic Pathways', href: '', icon: 'pathway' },
            { label: 'Neurons', href: '', icon: 'neuron' },
        ]
    }
]

interface Publication {
    description: ReactNode;
    authors: ReactNode;
    href: string;
}

export const publicationData: Publication[] = [
    {
        href: "#",
        description: (
            <>
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
          </>
        ),
        authors: (<>Author <i>et al.</i>, 2021</>)
    },
    {
        href: "#",
        description: (
            <>
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
          </>
        ),
        authors: (<>Author <i>et al.</i>, 2021</>)
    },
    {
        href: "#",
        description: (
            <>
            <strong>The Somatosensory Cortex</strong>: Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
          </>
        ),
        authors: (<>Author <i>et al.</i>, 2021</>)
    }
]