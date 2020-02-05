import React from 'react';
import Button from '../components/Button';
import ScrollTo from '../components/ScrollTo';
import ScrollTop from '../components/ScrollTop';
import Collapsible from '../components/Collapsible';
import InfoBox from '../components/InfoBox';
import List from '../components/List';
import Pills from '../components/Pills';
import ImageViewer from '../components/ImageViewer';
import Filters from '../layouts/Filters';
import Title from '../layouts/Title';

export const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export const dinos = [
  'T-Rex',
  'Stegosaurus',
  'Triceratops',
  'Brontosaurus',
  'Pterodactyl',
  'Velociraptor',
  'Cassowary',
];

const color = 'red';

const Styleguide: React.FC = () => {
  const dummyFn = () => {
    console.log('click');
  };
  const dummyFnStr = str => {
    console.log(str);
  };

  return (
    <Filters primaryColor={color}>
      <div>
        <div id="top" role="title">
          <Title
            title="Styleguide"
            subtitle="SSCx Portal"
            hint="A collection of useful elements"
            primaryColor={color}
          />
        </div>

        <section>
          <h3>Buttons</h3>
          <h4>Primary</h4>
          <Button primary palette="warm" onClick={dummyFn}>
            hellfire
          </Button>
          <br />
          <br />
          <Button primary palette="cool" onClick={dummyFn}>
            cool as a cucumber
          </Button>
          <h4>Active</h4>
          <Button active palette="warm" onClick={dummyFn}>
            Hot and Active
          </Button>
          <br />
          <br />
          <Button active palette="cool" onClick={dummyFn}>
            Winter Sports
          </Button>
          <h4>Regular</h4>
          <Button palette="warm" onClick={dummyFn}>
            good ol' button
          </Button>
          <h4>Discrete</h4>
          <Button palette="cool" discrete onClick={dummyFn}>
            I'm rather shy
          </Button>
          <h4>Notifications</h4>
          <Button palette="cool" notifications={7} onClick={dummyFn}>
            Duly notified
          </Button>
        </section>

        <section>
          <h3>Select</h3>
          <h4>List</h4>
          <List
            title="1. Pick a dino 🦕🦕🦕 (warm palette)"
            list={dinos}
            palette="warm"
            selected={dinos[2]}
            onSelect={dummyFnStr}
          />
          <br />
          <List
            title="1a. The dinos got cooler 😎"
            list={dinos.slice(0, 3)}
            palette="cool"
            selected={dinos[1]}
            onSelect={dummyFnStr}
          />
          <h4>Pills</h4>
          <p>
            <em>
              NB: I inverted the styles for selected and not-selected, to match
              the logic of the other buttons – it was weird otherwise)
            </em>
          </p>
          <Pills
            title="1. Select a dino pill 🦖💊🦖💊"
            list={dinos.slice(0, 3)}
            palette="cool"
            selected={dinos[2]}
            onSelect={dummyFnStr}
          />
        </section>

        <section>
          <h3>Navigation</h3>
          <h4>Scroll to anchor</h4>
          <p>
            <em>TODO: Responsive design</em>
          </p>
          <ScrollTo anchor="top" direction="up">
            Return to filters
          </ScrollTo>
          <br />
          <ScrollTo anchor="bottom" direction="down">
            View data
          </ScrollTo>
          <h4>Scroll top</h4>
          <ScrollTop anchor="top" />
        </section>

        <section>
          <h3>Content</h3>
          <h4>Collapsible</h4>
          <Collapsible title="Murderous Bird on the Loose">
            <>
              <img
                src={require('../assets/images/cassowary.jpg')}
                alt="cassowary"
              />
              <p>
                A cassowary escapes from the local zoo. Already 482 have
                suffered from his lethal kick.
              </p>
            </>
          </Collapsible>
          <br />
          <Collapsible title="Murderous Bird on Lockdown" collapsed={true}>
            <>
              <img
                src={require('../assets/images/cassowary.jpg')}
                alt="cassowary"
              />
              <p>
                Newsflash: the escaped cassowary has been safely apprehended
                earlier this afternoon. He is facing the most severe charges.
              </p>
            </>
          </Collapsible>
          <h4>Info box</h4>
          <InfoBox
            title="Short Text"
            text="No need to show the read more link."
          />
          <br />
          <InfoBox title="Longer Text" text={lorem} />
          <br />
          <InfoBox text={`This one has no title o_0\n${lorem}`} />
          <h4>Image viewer</h4>
          <p>
            <em>TODO: Make expand function work properly</em>
          </p>
          <ImageViewer
            src={require('../assets/images/cassowary.jpg')}
            alt="cassowary"
          />
        </section>

        <section id="bottom" />
      </div>
    </Filters>
  );
};

export default Styleguide;
