import React from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import ScrollTo from '../components/ScrollTo';

const Styleguide: React.FC = () => {
  const dummyFn = () => {
    console.log('click');
  };

  return (
    <>
      <h1 role="title">Styleguide</h1>

      <section id="top" />

      <section role="section">
        <h2>Buttons</h2>
        <p>Primary warm</p>
        <Button primary="warm" onClick={dummyFn}>
          hellfire
        </Button>
        <p>Primary cold</p>
        <Button primary="cool" onClick={dummyFn}>
          cool as a cucumber
        </Button>
        <p>Regular</p>
        <Button onClick={dummyFn}>good ol' button</Button>
        <p>Active</p>
        <Button active onClick={dummyFn}>
          I'm sooo active
        </Button>
        <p>With notifications</p>
        <Button notifications={7} onClick={dummyFn}>
          Duly notified
        </Button>
      </section>

      <section role="section">
        <h2>Scroll To</h2>
        <p>Bottom, warm color scheme</p>
        <ScrollTo anchor="bottom" palette="warm" direction="down">
          View data
        </ScrollTo>
        <p>Top, cool color scheme</p>
        <ScrollTo anchor="top" palette="cool" direction="up">
          Return to filters
        </ScrollTo>
      </section>

      <section role="section">
        <h2>Initial</h2>
        <p>Warm</p>
        <Icon background="warm" color="white">
          E
        </Icon>
        <p>Cold</p>
        <Icon background="cool" color="white">
          M
        </Icon>
        <p>Background</p>
      </section>

      <section role="section">
        <h2>Content</h2>
        <p>Collapse</p>
        <p>Read more</p>
        <p>Modal</p>
        <p>List</p>
      </section>

      <section id="bottom" />
    </>
  );
};

export default Styleguide;
