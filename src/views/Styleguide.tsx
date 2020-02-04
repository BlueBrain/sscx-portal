import React from 'react';
import Button from '../components/Button';
import ScrollTo from '../components/ScrollTo';
import ScrollTop from '../components/ScrollTop';
import Collapsible from '../components/Collapsible';
import InfoBox from '../components/InfoBox';

const Styleguide: React.FC = () => {
  const dummyFn = () => {
    console.log('click');
  };
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <>
      <h1 role="title">Styleguide</h1>

      <section id="top"/>

      <section role="section">
        <h2>Buttons</h2>
        <p>Primary warm</p>
        <Button primary palette="warm" onClick={dummyFn}>
          hellfire
        </Button>
        <p>Primary cool</p>
        <Button primary palette="cool" onClick={dummyFn}>
          cool as a cucumber
        </Button>
        <p>Regular (cool palette)</p>
        <Button palette="cool" onClick={dummyFn}>good ol' button</Button>
        <p>Active (warm palette)</p>
        <Button active palette="warm" onClick={dummyFn}>
          Sooo active
        </Button>
        <p>With notifications (cool palette)</p>
        <Button palette="cool" notifications={7} onClick={dummyFn}>
          Duly notified
        </Button>
      </section>

      <section role="section">
        <h2>Navigation</h2>
        <p>Scroll down, warm color palette</p>
        <ScrollTo anchor="bottom" palette="warm" direction="down">
          View data
        </ScrollTo>
        <p>Scroll up, cool color palette</p>
        <ScrollTo anchor="top" palette="cool" direction="up">
          Return to filters
        </ScrollTo>
        <p>Scroll to top</p>
        <ScrollTop anchor="top"/>
      </section>

      <section role="section">
        <h2>Content</h2>
        <p>Collapse</p>
        <Collapsible title="Murderous Bird on the Loose">
          <>
            <img src={require('../assets/images/cassowary.jpg')} alt="cassowary"/>
            <p>A cassowary escapes from the local zoo!</p>
          </>
        </Collapsible>
        <p>Info box</p>
        <InfoBox title='Short Text' text='It is what it is.' />
        <br />
        <InfoBox title='Longer Text' text={lorem} />
        <p>List</p>
        <p>Pills</p>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section id="bottom"/>
    </>
  );
};

export default Styleguide;
